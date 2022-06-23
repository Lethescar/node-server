const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors=require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/*引入路由模块*/
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(8080);
//从此所有响应，自动带Access-Control-Allow-Origin
//万一客户端浏览器地址发生变化，只改这里origin一处即可！
app.use(cors({
  origin:["http://127.0.0.1:3000","http://localhost:3000","http://localhost:8000",],
  credentials:true
}));

//配置session
app.use(session({
  secret:"nodeServer",
  resave:true,
  saveUninitialized:true
}));

app.post('/',function(req,res){
	res.send('成功')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


