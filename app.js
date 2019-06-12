let Koa=require('koa');
let cors = require('koa2-cors');

//bodyparser获取表单提交数据
let bodyParser=require('koa-bodyparser');

const path = require('path')
const static = require('koa-static')

let app=new Koa();

//配置静态资源目录
app.use(static(
	path.join( __dirname,'./uploads')
  ))

app.use(bodyParser());
//配置session
// let session = require('koa-session');
// app.keys = ['some secret hurr'];
// const CONFIG = {
//   key: 'koa:sess',
//   maxAge: 60*1000*60,
//   autoCommit: true,
//   overwrite: true,
//   httpOnly: true,
//   signed: true,
//   rolling: true, //用户无操作60分钟后才过期
//   renew: false,
// };
// app.use(session(CONFIG, app));

// app.use(cors({
// 	origin: function(ctx) {
// 	  if (ctx.url === '/test') {
// 		return false;
// 	  }
// 	  return '*';
// 	},
// 	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
// 	maxAge: 5,
// 	credentials: true,
// 	allowMethods: ['GET', 'POST', 'DELETE','PATCH','PUSH'],
// 	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
//   }));
app.use(cors());

//Koa中间件，应用级中间件
//匹配任何一个路由之前都会经过此中间件
//中间件可以放在随意位置，但一定是先执行中间件再匹配路由
app.use(async (ctx,next)=>{
	//路由拦截操作
	//...
	//全局变量
	// ctx.state={
	// 	username:'zhuyinghui'
	// };
	await next();
	if(ctx.status===404){
		ctx.body='错误404：找不到页面'
	}
});


//封装路由
let Router=require('koa-router');
let router=new Router();
app.use(require('./api.js').routes());

app.use(router.routes()).use(router.allowedMethods());//启动路由

app.listen(8081);