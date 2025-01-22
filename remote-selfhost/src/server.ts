import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { Level } from 'level';
import { RemoteStatus } from '../../core/types';

const db = new Level('./db');
const app = new Koa();
const router = new Router();

const READ_TIMEOUT = 5;
const WRITE_TIMEOUT = 30;

const recentIPsRead = new Set<string>();
const recentIPsWrite = new Set<string>();
let readReset = Math.floor(Date.now() / 1000);
let writeReset = Math.floor(Date.now() / 1000);

const getSeconds = () => Math.floor(Date.now() / 1000);

async function updateTimeout() {
    if (getSeconds() - readReset >= READ_TIMEOUT) {
        readReset = getSeconds();
        recentIPsRead.clear();
    }
    if (getSeconds() - writeReset >= WRITE_TIMEOUT) {
        writeReset = getSeconds();
        recentIPsWrite.clear();
    }
}

function timeoutCheck(ip: string, write: boolean): boolean {
    const recentIPs = write ? recentIPsWrite : recentIPsRead;
    if (recentIPs.has(ip)) return true;
    recentIPs.add(ip);
    return false;
}

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    
    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
    }
    
    await next();
});

app.use(bodyParser({ enableTypes: ['text'], textLimit: '3mb' }));

router.get('/get/:token', async (ctx) => {
    const ip = ctx.ip;
    await updateTimeout();
    
    if (timeoutCheck(ip, false)) {
        ctx.body = RemoteStatus.Timeout;
        return;
    }
    
    try {
        const data = await db.get(ctx.params.token);
        ctx.body = RemoteStatus.Success + data;
    } catch (error: any) {
        if (error.notFound) {
            ctx.body = RemoteStatus.NoData;
        } else {
            throw error;
        }
    }
});

router.post('/set/:token', async (ctx) => {
    const ip = ctx.ip;
    await updateTimeout();
    
    if (timeoutCheck(ip, true)) {
        ctx.body = RemoteStatus.Timeout;
        return;
    }
    
    const data = ctx.request.body;
    if (typeof data !== 'string' || data.length > 1024 ** 2 * 3) {
        ctx.body = RemoteStatus.TooLarge;
        return;
    }
    
    await db.put(ctx.params.token, data);
    ctx.body = RemoteStatus.Success;
});

router.get('/exists', (ctx) => {
    ctx.body = RemoteStatus.Exists;
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx) => {
    ctx.body = RemoteStatus.InvalidRoute;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});