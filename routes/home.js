const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/getrecommend",(req,res)=>{
  var sql="SELECT * FROM accounts LIMIT 0,10";
  pool.query(sql,(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send({code:200,msg:"查询成功",data:result});
    }
  });
})

module.exports=router;