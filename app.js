//使用express构建web服务器
const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors=require("cors");

const home=require("./routes/home.js");

/*引入路由模块*/
var server = express();
server.listen(8080);
server.use(cors({
  origin:["http://127.0.0.1:3000","http://localhost:3000","http://localhost:8000",],
  credentials:true
}));
//从此所有响应，自动带Access-Control-Allow-Origin
//万一客户端浏览器地址发生变化，只改这里origin一处即可！
//配置session
server.use(session({
  secret:"nodeServer",
  resave:true,
  saveUninitialized:true
}));
console.log('服务器启动完成,端口号8080');

server.post('/',function(req,res){
	res.send('成功')
});

//使用body-parser中间件
server.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
server.use(express.static('public'));
/*使用路由器来管理路由*/
server.use("/home",home);


