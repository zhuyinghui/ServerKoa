let router=require('koa-router')();
let DB=require('../module/connectMongodb');
//MD5加密
let crypto=require('crypto');

//获取全部卖家信息
router.get('/all',async (ctx)=>{
	const data=await DB.find('sellerInfo',{});
	ctx.body=data;
})

//商家登陆
router.get('/',async (ctx)=>{
	let data=ctx.request.query;
	let md5 = crypto.createHash('md5');
	data.password=md5.update(data.password).digest('hex');
	let a=await DB.find('sellerInfo',{
		"phone":data.account
	});
	if(!a.length){
		ctx.body={
			status:0,
			ctn:'账号不存在，请前往注册'
		};
	}else{
		let b=a[0].password===data.password;
		if(!b){
			ctx.body={
			status:0,
			ctn:'密码错误'
			};
		}else{
			let c=a[0].limit===true;
			if(c){
				ctx.body={
					status:1,
					ctn:'登陆成功',
					pwd:a[0].password
				}	
			}else{
				ctx.body={
					status:2,
					ctn:'账号正在等待管理员审核，审核通过后即可进入卖家中心。'
				}
			}
		
		}
	}
});

//商家注册
router.post('/',async (ctx)=>{
	let data=ctx.request.body;
	console.log(data);
	let md5 = crypto.createHash('md5');
	data.password=md5.update(data.password).digest('hex');
	const a=await DB.find('sellerInfo',{
		"phone":data.phone
	});
	const b= await DB.find('sellerInfo',{
		"shop_name":data.shop_name_name
	});
	if(a.length){
		ctx.body={
			status:0,
			ctn:'此手机号已被注册，请前往登陆'
		}
	}else if(b.length){
		ctx.body={
			status:0,
			ctn:'此店铺名称已被注册，不可重复'
		}
	}else{
		await DB.add('sellerInfo',data);
		ctx.body={
			status:1,
			ctn:'注册成功，正在等待管理员审核，审核通过后即可进入卖家中心。'
		}
	}
});

//审核通过商家的账号注册申请,修改账号的权限
router.get('/limit',async (ctx)=>{
	const data=ctx.request.query;
	const a=await DB.limit('adminInfo',data.admin);
	if(a){
		const result=await DB.update('sellerInfo',{
			"phone":data.phone
		},{
			"limit":true
		});
		ctx.body=result;
	}
})

module.exports=router;