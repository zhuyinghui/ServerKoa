//连接数据库
let MongoClient=require('mongodb').MongoClient;
let url="mongodb://localhost:27017";
let dbName='Miaowu';
class DB{
	static getInstance(){   /*单例  多次实例化实例不共享的问题*/
        if(!DB.instance){
            DB.instance=new DB();
        }
        return  DB.instance;
    }
	constructor() {
		this.dbClient='';
		// this.connect();
	}
	connect(){
		return new Promise((resolve,reject)=>{
			if(!this.dbClient){
				MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> {
				  if(err){
						reject(err);
				  }else{
						console.log("数据库连接成功");
						this.dbClient = client.db(dbName);
						resolve(this.dbClient);
						// client.close();
				  }
				});
			}else{
				resolve(this.dbClient);
			}
		})
	}
	find(collectionName,condition){
		return new Promise((resolve,reject)=>{
			this.connect().then(db=>{
				let result=db.collection(collectionName).find(condition);
				result.toArray((err,data)=>{
					if(err){
						reject(err);
					}else{
						resolve(data);
					}
				})
			}).catch(err=>{
				console.log(err+'连接数据库失败');
			})
		})
	}
	add(collectionName,jsonText){
		return new Promise((resolve,reject)=>{
			this.connect().then(db=>{
				db.collection(collectionName).insertOne(jsonText,err=>{
					if(err){
						reject(err+'插入数据失败');
					}else{
						resolve('插入数据成功');
					}
				});
			}).catch(err=>{
				console.log(err+'连接数据库失败');
			})
		})
	}
	update(collectionName,condition,jsonText){
		return new Promise((resolve,reject)=>{
			this.connect().then(db=>{
				db.collection(collectionName).updateOne(condition,{$set:jsonText},err=>{
					if(err){
						reject(err+'更新数据失败');
					}else{
						resolve('更新数据成功');
					}
				})
			}).catch(err=>{
				console.log(err+'连接数据库失败');
			})
		})
	}
	delete(collectionName,condition){
		return new Promise((resolve,reject)=>{
			this.connect().then(db=>{
				db.collection(collectionName).deleteOne(condition,err=>{
					if(err){
						reject(err+'删除数据失败');
					}else{
						resolve('删除数据成功')
					}
				})
			}).catch(err=>{
				console.log(err+'连接数据库失败');
			})
		})
	}

	//表的记录条数
	count(collectionName,condition){
		return new Promise((resolve,reject)=>{
			this.connect().then(db=>{
				let count=db.collection(collectionName).find(condition).count();
				resolve(count);
			}).catch(err=>{
				console.log(err+'连接数据库失败');
			})
		})
	}
	//判定账户是否有指定表的权限
	limit(collectionName,condition){
		return new Promise((resolve,reject)=>{
			this.connect().then(db=>{
				this.find(collectionName,condition).then(val=>{
					if(val.length){
						resolve(true);
					}else{
						resolve(false);
					}	
				}).catch(err=>{
					reject(err)
				})
			}).catch(err=>{
				console.log(err+'连接数据库失败');
			})
		})
	}
}

module.exports=DB.getInstance();
	
	
	
