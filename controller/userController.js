
var config = require('../config');
const fetch = require('node-fetch');
const RX=require('@reactivex/rxjs');
module.exports={
	getUsers:function(req,res){

		
 //let data={};
  let myPromise=fetch('http://jsonplaceholder.typicode.com/users/');
  let jsonPromise=myPromise.then(x=>{return x.json();});

   jsonPromise.then(function(json) {
    	data=json;
    	//res.render('./index.ejs',{data:json});
       // console.log(data);
        res.render('./index.ejs',{users:json});
    });


// using observable
   RX.Observable.fromPromise(jsonPromise)
    
   .subscribe(function(data){

   	//console.log(data);
   	res.render('./index.ejs',{users:data});
   }, function(e){console.log(e)});


// using async and await
   async function findUsers(){

   	try{
   		let result=await jsonPromise;
        //res.send(result);
        //console.log(result);
        res.render('./index.ejs',{users:result});
   	}
   	catch(err)
   	{  
   		console.log(err);
   	}
   }
    findUsers(); 
    
	   }
	

}