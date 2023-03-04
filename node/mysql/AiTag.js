const mysql = require('mysql');
const db = mysql.createPool({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

function SelectData(select,callback){
  db.query(select,(err,res)=>{
    if(err) return console.log(err)
    callback(res)
  })
}

module.exports={
  SelectData
}