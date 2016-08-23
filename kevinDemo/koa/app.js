var koa = require('koa');
var app = koa();
app.keys = ['im a newer secret', 'i like turtle'];

app.use(function *() {
    this.body  = 'hello world kevin';
    this.cookies.set('name', 'kevin', { signed: true });
});

app.listen(3000);