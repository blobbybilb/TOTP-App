import Koa from 'koa';
import KoaRouter from '@koa/router';
const { koaBody } = require('koa-body');
import { RemoteStatus } from '../core/types';
import fs from 'fs';
const app = new Koa();
const router = new KoaRouter();
const dataDir = './data';
function saveData(token, data) {
    fs.writeFileSync(`${dataDir}/${token}`, data);
}
router
    .get('/exists/', (ctx, next) => {
    ctx.body = RemoteStatus.Exists;
})
    .get('/get/:token', (ctx, next) => {
    ctx.body = ctx.params.token;
})
    .post('/set/:token', koaBody(), (ctx, next) => {
    // call saveData with post data
    saveData(ctx.params.token, ctx.request.body);
});
app.use(router.routes()).listen(3000);
