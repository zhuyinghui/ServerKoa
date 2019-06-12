let router=require('koa-router')();
let DB=require('../module/connectMongodb');
let crypto=require('crypto');

//买家登陆
router.get('/',async (ctx)=>{
    let data=ctx.request.query;
    let md5 = crypto.createHash('md5');
    data.password=md5.update(data.password).digest('hex');
    const a=await DB.find('userInfo',{
        "password":data.password,
        $or:[{"email":data.account},{"username":data.account}]
    })
    if(a.length){
        ctx.body={
            status:1,
            message:'登陆成功',
            password:a[0].password,
            username:a[0].username
        }
    }else{
        ctx.body={
            status:0,
            message:'账号或密码错误'
        }
    }
});

//买家注册
router.post('/',async (ctx)=>{
    let data=ctx.request.body.userInfo;
    let md5 = crypto.createHash('md5');
    data.password=md5.update(data.password).digest('hex');
    console.log(data);
    const a=await DB.find('userInfo',{
        "username":data.username
    });
    const b=await DB.find('userInfo',{
        "email":data.email
    });
    if(a.length){
        ctx.body={
            status:0,
            message:'账号已存在，请前往登陆'
        }
    }else if(b.length){
        ctx.body={
            status:0,
            message:'邮箱已被注册，请前往登陆'
        }
    }else{
        await DB.add('userInfo',data);
        ctx.body={
            status:1,
            message:'注册成功',
            password:data.password
        };
    }
});

module.exports=router;