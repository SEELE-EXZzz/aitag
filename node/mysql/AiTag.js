const mysql = require('mysql');
const db = mysql.createPool({
  host     : '45.78.23.117',
  user     : 'root',
  password : 'KAIwu2012',
  database : 'AiTag'
});

const select = require('./select/zcyzcy88')

 const select1 = 'select * from AiTag.服装风格'
// const select2 = 'select * from AiTag.服装类物品'
// const select3 = 'select * from AiTag.人物表情'
// const select4 = 'select * from AiTag.人物类型'
// const select5 = 'select * from AiTag.人物形态'
// const select6 = 'select * from AiTag.人物姿势动作状态'
// const select7 = 'select * from AiTag.图片属性'
// const select8 = 'select * from AiTag.物品和背景'
// const select9 = 'select * from AiTag.和谐类'


function SelectData(select,callback){
  db.query(select,(err,res)=>{
    if(err) return console.log(err)
    callback(res)
  })
}

module.exports={
  SelectData
}