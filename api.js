let router=require('koa-router')();
let DB=require('./module/connectMongodb');
//商品管理—— 商品列表 商品添加
router.use('/goodsInfo',require('./api/goodsInfo.js').routes());
//商品管理—— 宠物猫列表 宠物添加
router.use('/catsInfo',require('./api/catsInfo.js').routes());

//卖家管理——卖家审核 
router.use('/sellerInfo',require('./api/sellerInfo.js').routes());
//获取、提交地址
router.use('/addressInfo',require('./api/addressInfo.js').routes());

//管理员管理
router.use('/adminInfo',require('./api/adminInfo.js').routes());
//宠物猫分类管理
router.use('/catsVariety',require('./api/catsVariety.js').routes());

router.get('/test',async (ctx)=>{
    
    ctx.body='test';
});

module.exports=router;