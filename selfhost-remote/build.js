import Koa from 'koa';
import KoaRouter from '@koa/router';
const app = new Koa();
const router = new KoaRouter();
router
    .get('/get/:token', (ctx, next) => {
    ctx.body = ctx.params.token;
})
    .post('/set/:token', (ctx, next) => { });
app.use(router.routes()).listen(3000);
