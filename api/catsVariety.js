let router=require('koa-router')();
let DB=require('../module/connectMongodb');
let ObjectId=require('mongodb').ObjectID;
//分类信息获取
router.get('/',async (ctx)=>{
    const result=await DB.find('catsVariety',{});
    ctx.body=result;
});

//宠物猫分类信息添加
router.post('/',async (ctx)=>{
    let data=ctx.request.body;
    const a=await DB.limit('adminInfo',data.admin);
    if(a){
        const result=await DB.add('catsVariety',data.Cats);
        ctx.body=result;
    }else{
        ctx.body='无管理员权限';
    }
});

//宠物猫分类信息删除
router.delete('/',async (ctx)=>{
    let data=ctx.request.query;
    const a=await DB.limit('adminInfo',data.admin);
    if(a){
        const message=await DB.delete('catsVariety',{
            "_id":ObjectId(data.variety_id)
        });
        ctx.body=message;
    }else{
        ctx.body='无管理员权限';
    }
});
module.exports=router;