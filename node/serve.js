const qiniu = require('qiniu')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const multer=require("multer")
const fileupload = require("express-fileupload");
const {SelectData} = require('./mysql/AiTag')
const selectzcyzcy88 = require('./mysql/select/zcyzcy88')
const selectkuangbao = require('./mysql/select/kuangbao')

app.use(fileupload());
app.use(cors())
app.use(bodyParser.json({limit :"2100000kb"}))
app.use(express.json())

app.listen(10000,()=>{
  console.log('node正在监听10000端口')
})
app.get('/AiTagCard/image',(req,res)=>{
  let key = req.query.key
  console.log('传输成功')
  const accessKey = '';
  const secretKey = '';
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: '',
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken=putPolicy.uploadToken(mac);

  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  var publicBucketDomain = 'https://image.seele-exzzz.xyz';
  // 公开空间访问链接
  var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
  console.log(publicDownloadUrl);
  const SendData = {
    uploadToken,
    publicDownloadUrl
  }
    res.send(SendData)

})

app.get('/writer',(req,res)=>{
  let id = req.query.id == undefined ? 0 : req.query.id
  if(req.query.writer == '狂暴淦饭组长'){
    SelectData(selectkuangbao.select[id],(data)=>{
      res.send(data)
    })
  }
  if(req.query.writer == 'zcyzcy88'){
    SelectData(selectzcyzcy88.select[id],(data)=>{
      res.send(data)
    }) 
  }
})

app.get('/FullAiTag',(req,res)=>{
  SelectData('select * from AiTag.阿巧',(data)=>{
    res.send(data)
  })
})





