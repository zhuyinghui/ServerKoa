let router=require('koa-router')();
let DB=require('../module/connectMongodb');

//根据所有编码查找地址
router.get('/',async (ctx)=>{
	//获取get传值 
	let address=ctx.query;
	let name='';
	//http://zhuyinghui.shop:8081/addressInfo?id1=1&id2=1&id3=1
	let result1=await DB.find('provinceCode',{
		province_id:address.id1
	});
	name+=result1[0].province; //省名
	let result2=await DB.find('cityCode',{
		province_id:address.id1,
		city_id:address.id2
	})
	name+=result2[0].city; //城市名
	let result3=await DB.find('countyCode',{
		city_id:address.id2,
		county_id:address.id3
	})
	name+=result3[0].county; //区名
	let code='';
	code+=address.id1;
	code+=address.id2;
	code+=address.id3;
	ctx.body={
		address:name,
		address_id:code
	};
});

//获取全部地址数据
router.get('/all',async (ctx)=>{
	let provincenum=await DB.count('provinceCode',{});
	let Arr=[];
	for(let i=0;i<provincenum;i++){
		let i2=(i+1).toString();
		let proarr=await DB.find('provinceCode',{
			province_id:i2
		});
		let proarr2={
			province_id: proarr[0].province_id,
			province: proarr[0].province,
			citys:[]
		}
		let cityarr=await DB.find('cityCode',{
			province_id:i2
		})
		for(let j=0;j<cityarr.length;j++){
			j2=(j+1).toString();
			let cityarr2={
				city_id:cityarr[j].city_id,
				city:cityarr[j].city,
				countys:[]
			}
			let countyarr=await DB.find('countyCode',{
				city_id:j2
			});
			for(let k=0;k<countyarr.length;k++){
				let countyarr2={
					county_id:countyarr[k].county_id,
					county:countyarr[k].county
				}
				cityarr2.countys.push(countyarr2)
			}
			proarr2.citys.push(cityarr2);
		}
		Arr.push(proarr2);
	}
	ctx.body=Arr;
});

module.exports=router;