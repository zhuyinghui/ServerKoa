let router=require('koa-router')();
let DB=require('../module/connectMongodb');

//分类信息获取
router.get('/',async (ctx)=>{
    ctx.body=await DB.find('catsVariety',{});
});

//宠物猫分类信息添加
router.post('/',async (ctx)=>{
    console.log(ctx.request,body)
    // let data=ctx.request.body;
    // console.log(data);
    // ctx.body=data;
    // const a=await DB.limit('adminInfo',data.admin);
    // console.log(a);
    // if(a){
    //     const result=await DB.add('catsVariety',data.Cats);
    //     ctx.body=result;
    // }else{
    //     ctx.body='无管理员权限'
    // }
});

module.exports=router;