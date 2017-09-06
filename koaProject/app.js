const Koa = require('koa'),
      Router = require('koa-router');

const app = new Koa(),
      router = new Router();

app.use(require('koa-body')())
   .use(router.allowedMethods())
   .use(router.routes());

let users = [
  {
    "name": "jaap",
    "email": "jaap@birdy-app.com"
  },
  {
    "name": "kenny",
    "email": "kenny@test.nl"
  },
  {
    "name": "john",
    "email": "john@text.con"
  },
];

router.get('/user/:id', ctx => {
  ctx.body = users[ctx.params.id];
});

router.post('/user/:id', ctx => {
  ctx.body = Object.assign(users[ctx.params.id], ctx.request.body);
});

app.listen(1337)
