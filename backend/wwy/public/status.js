/**学籍信息模块**/

var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '981019',
    database : 'teaching_admin'
});
connection.connect();
var sql = 'SELECT * FROM students';
connection.query(sql,function (error,results) {
    var jsonResult;
    if (error){
        console.log('error : ' + error.message);
        jsonResult = {//返回json形式的数据
            "status" : "200",
            "message" : "success",
            data : null
        }
    }
    else {
        jsonResult = {
            "status" : "200",
            "message" : "success",
            data : results
        }
    }
    app.get('/',function (req,res,next) {//学籍查询
        res.status(200).send(jsonResult);
        console.log(results);
        next();
    });
    app.use(function (err,req,res,next) {//返回错误信息
        console.log('Error happen : ' + err.stack);
        next();
    })
});
app.listen(3000);