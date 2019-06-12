let router=require('koa-router')();
let DB=require('../module/connectMongodb');

//获取订单数据
router.get('/',async (ctx)=>{
    const data=ctx.request.query;
    const result=await DB.find('orderInfo',{
        "username":data.username
    })
    ctx.body=result;
})

//提交订单数据
router.post('/',async (ctx)=>{
    let data=ctx.request.body
    console.log(data);
    const a=await DB.limit('userInfo',data.user);
    console.log(a);
    let data2={
        username:data.user.username,
        orderlist:data.orderlist
    }
    if(a){
        const message=await DB.add('orderInfo',data2);
        ctx.body=message;
    }else{
        ctx.body='无用户权限';
    }
    
})

module.exports=router;