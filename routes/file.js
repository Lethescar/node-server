var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path')
const pool = require('../pool.js')

const localStorage = multer.diskStorage({
  // 上传文件目录
  destination: (req,file,path)=>{
    path(null,'public/uploads')
  },
  // 上传文件名称
  filename: (req,file,path)=>{
    path(null,file.originalname)
  }
})

// multer 配置
const localUpload = multer({
  storage:localStorage
})

// 上传接口
router.post('/localUpload', localUpload.single('file'), (req, res)=>{
  res.send({
    code: 0, 
    msg: '操作成功',
    type:'success',
    result:{code: 0, msg: '操作成功'}
  });
});


const storage = multer.memoryStorage()
const upload = multer({storage: storage})

// 上传接口
router.post('/upload', upload.single('file'), (req, res)=>{
  const file = req.file
  const data = {
    value: file.buffer
  }
  const sql = 'insert into files set ?'
  pool.query(sql,data,(err,result)=>{
    if (err) {
      res.send({
        code: 1, 
        msg: '操作失败',
        type:'error',
        result:{code: 1, msg: err.message}
      });
    }else{
      return res.send({
        code: 0, 
        msg: '操作成功',
        type:'success',
        result:{code: 0, msg: '操作成功'}
      });
    }
  })
});

// 下载接口
router.get('/download',(req,res)=>{
  const filePath = path.join(__dirname,'../public/images/1.jpeg')
  res.download(filePath)
})

// 从数据库下载接口
router.get('/downloadBySql',(req,res)=>{
  const sql = 'select * from files'
  pool.query(sql,(err,result)=>{
    if (err) {
      res.send(err.message)
    }else{
      res.set({
        'Content-Type': 'image/jpeg',
        'Accept-Ranges': 'bytes',
        'Content-Disposition': 'attachment; filename="filename.jpg"'
      })
      res.send(result[0].value)
    }
  })
})

module.exports = router;