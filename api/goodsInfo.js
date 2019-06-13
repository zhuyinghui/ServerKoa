let router=require('koa-router')();
let DB=require('../module/connectMongodb');
let ObjectId=require('mongodb').ObjectID;

//获取全部商品列表信息
router.get('/all',async (ctx)=>{
	const goods_id=ctx.request.query.goods_id;
	if(goods_id){
		const result=await DB.find('goodsInfo',{
			"_id":ObjectId(goods_id)
		});
		ctx.body=result;
	}else{
		const result=await DB.find('goodsInfo',{});
		ctx.body=result;
	}
});

//商品列表的获取
router.get('/',async (ctx)=>{
	const data=ctx.request.query;
	let result=await DB.find('goodsInfo',{
		"seller_id":data.phone
	});
	ctx.body=result;
});

// //商品添加
// let multer=require('koa-multer');
// let storage = multer.diskStorage({
// 	//文件保存路径
// 	destination: function (req, file, cb) {
// 	  cb(null, './uploads/')
// 	},
// 	filename:function(req,file,cb){
// 	var fileFormat = (file.originalname).split(".");
// 	cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
// 	}
//   })
//   //加载配置
//   let upload = multer({ storage: storage });
//   //路由
// router.post('/',upload.array('file'),async(ctx,next)=>{
// 	// let data=ctx.req.body;
// 	// let images=[];
// 	// for(let item of ctx.req.files){
// 	// 	images.push(item.filename);
// 	// }
// 	// const a=await DB.limit('sellerInfo',data.seller);
// 	// if(a){
// 	// 	data.goods.seller_id=data.seller.phone;
// 	// 	data.goods.images=images;
// 	// 	let message=await DB.add('goodsInfo',data.goods);
// 	// 	ctx.body=message;
// 	// }else{
// 	// 	ctx.body='无卖家权限';
// 	// }
// 	ctx.body={
// 		body:ctx.req.body
// 		// files:ctx.req.files
// 	}
// })

router.post('/',async (ctx)=>{
	let data=ctx.request.body;
	const a=await DB.limit('sellerInfo',data.seller);
	if(a){
		data.goods.seller_id=data.seller.phone;
		let message=await DB.add('goodsInfo',data.goods);
		ctx.body=message;
	}else{
		ctx.body='无卖家权限';
	}
});

//商品删除
router.delete('/',async (ctx)=>{
	const data=ctx.request.query;
	const a=await DB.limit('sellerInfo',data.seller);
	if(a){
		const message=await DB.delete('goodsInfo',{
			"_id":ObjectId(data.goods_id)
		})
		ctx.body=message;
	}else{
		ctx.body='无卖家权限'
	}
});

module.exports=router;