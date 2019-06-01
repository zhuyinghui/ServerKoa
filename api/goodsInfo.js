let router=require('koa-router')();
let DB=require('../module/connectMongodb');
let ObjectId=require('mongodb').ObjectID;
router.get('/',async (ctx)=>{
	const data=ctx.request.query;
	const a=await DB.limit('sellerInfo',data);
	if(a){
		let result=await DB.find('goodsInfo',{
			"seller_id":data.phone
		})
		ctx.body=result;
	}else{
		ctx.body='无卖家权限'
	}
});

// let multer=require('koa-multer');
// var storage = multer.diskStorage({
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
//   var upload = multer({ storage: storage });
//   //路由
//   router.post('/',upload.single('file'),async(ctx,next)=>{
// 	console.log(ctx.req.body);
// 	console.log(ctx.req.file);
// 	ctx.body = {
// 	  filename: ctx.req.file.filename  //返回文件名 
// 	}  
//   })

//商品添加
router.post('/',async (ctx)=>{
	let data=ctx.request.body;
	const a=await DB.limit('sellerInfo',data.seller);
	if(a){
		data.goods.seller_id=data.seller.phone;
		ctx.body=await DB.add('goodsInfo',data.goods);
	}else{
		ctx.body='无卖家权限';
	}
});

//商品删除
router.get('/delete',async (ctx)=>{
	const data=ctx.request.query;
	const a=await DB.limit('sellerInfo',data.seller);
	if(a){
		const result=await DB.find('goodsInfo',{
			"_id":ObjectId(data.goods_id)
		})
		ctx.body=result;
	}else{
		ctx.body='无卖家权限'
	}
});

module.exports=router;