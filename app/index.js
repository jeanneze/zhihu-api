const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const app = new Koa();
const routing = require('./routers');
const { connectionStr } =  require('./config');

mongoose.connect(connectionStr, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('MongDB 链接成功了'));
mongoose.connection.on('error', console.error)

// app.use(async (ctx, next) => {  // 自己编写的错误捕获中间件
//   try {
//     await next();
//   } catch(err) {
//     ctx.status = err.status || err.statusCode || 500;  // 状态码500 为运行时错误
//     ctx.body = {
//       message: err.message
//     }
//   }
// })
// 通常静态文件都放在最前面
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(error({
  postFormat: (err, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}));

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}));
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
  console.log('服务已启动在: 3000 端口~')
});