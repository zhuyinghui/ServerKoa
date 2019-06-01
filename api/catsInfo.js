let router=require('koa-router')();
let DB=require('../module/connectMongodb');

router.get('/',async (ctx)=>{
	ctx.body=await DB.find('catsInfo',{});
});
router.post('/',async (ctx)=>{
	let data=ctx.request.body;
	console.log(data);
	ctx.body=data;
	// ctx.body=await DB.add('catsInfo',data);
});

module.exports=router;