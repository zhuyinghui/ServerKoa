let router=require('koa-router')();
let DB=require('../module/connectMongodb');
let ObjectId=require('mongodb').ObjectID;

//获取全部宠物猫商品列表信息
router.get('/all',async (ctx)=>{
	const goods_id=ctx.request.query.goods_id;
	if(goods_id){
		const result=await DB.find('catsInfo',{
			"_id":ObjectId(goods_id)
		});
		ctx.body=result;
	}else{
		const result=await DB.find('catsInfo',{});
		ctx.body=result;
	}
});

//获取宠物猫商品信息
router.get('/',async (ctx)=>{
	const data=ctx.request.query;
	let result=await DB.find('catsInfo',{
		"seller_id":data.phone
	})
	ctx.body=result;
});

//宠物猫商品的添加
router.post('/',async (ctx)=>{
	let data=ctx.request.body;
	const a=await DB.limit('sellerInfo',data.seller);
	if(a){
		data.Cat.seller_id=data.seller.phone;
		const message=await DB.add('catsInfo',data.Cat);
		ctx.body=message;
	}else{
		ctx.body='无卖家权限';
	}
});

//宠物猫商品删除
router.delete('/',async (ctx)=>{
	const data=ctx.request.query;
	const a=await DB.limit('sellerInfo',data.seller);
	if(a){
		const message=await DB.delete('catsInfo',{
			"_id":ObjectId(data.cats_id)
		})
		ctx.body=message;
	}else{
		ctx.body='无卖家权限'
	}
});
module.exports=router;