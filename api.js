let router=require('koa-router')();
let DB=require('./module/connectMongodb');
router.use('/goodsInfo',require('./api/goodsInfo.js').routes());
router.use('/catsInfo',require('./api/catsInfo.js').routes());
router.use('/sellerInfo',require('./api/sellerInfo.js').routes());
router.use('/addressInfo',require('./api/addressInfo.js').routes());
router.use('/adminInfo',require('./api/adminInfo.js').routes());
router.use('/catsVariety',require('./api/catsVariety.js').routes());
router.use('/userInfo',require('./api/userInfo.js').routes());
router.use('/orderInfo',require('./api/orderInfo.js').routes());

router.get('/test',async (ctx)=>{
    console.log('--Get---');
    console.log(ctx.request.query);
    ctx.body=ctx.request.query;
});
router.post('/test',async (ctx)=>{
    console.log('--Post---');
    console.log(ctx.request.body);
    ctx.body=ctx.request.body;
});

let multer=require('koa-multer');
let storage = multer.diskStorage({
	//文件保存路径
	destination: function (req, file, cb) {
	  cb(null, './uploads/')
	},
	filename:function(req,file,cb){
	var fileFormat = (file.originalname).split(".");
	cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
  })
  //加载配置
  let upload = multer({ storage: storage });
  //路由
router.post('/file',upload.array('file'),async(ctx,next)=>{
    console.log(ctx.req.body);
    console.log(ctx.req.files);
    ctx.body={
        body:ctx.req.body,
        file:ctx.req.files
    }
})

router.delete('/test',async (ctx)=>{
    console.log('--Delete---');
    console.log(ctx.request.query);
    ctx.body=ctx.request.query;
});
router.patch('/test',async (ctx)=>{
    console.log('--Patch---');
    console.log(ctx.request.body);
    ctx.body=ctx.request.body;
});
module.exports=router;