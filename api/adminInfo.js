let router=require('koa-router')();
let DB=require('../module/connectMongodb');
let crypto=require('crypto');

//管理员账号登陆
router.get('/',async (ctx)=>{
    const data=ctx.request.query;
    let md5 = crypto.createHash('md5');
	data.password=md5.update(data.password).digest('hex');
    const a=await DB.limit('adminInfo',data);
    if(a){
        ctx.body=data;
    }
});

module.exports=router;