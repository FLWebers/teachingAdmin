/*学生选课模块*/

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();


var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '981019',
    database : 'teaching_admin'
});
connection.connect();
var sql = 'SELECT * FROM COURSES';
connection.query(sql,function (error,result) {
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
            data : result
        }
    }
    app.post('/test',function (req,res,next) {
        res.status(200).send(jsonResult);
        console.log('5656565');
        next();
    })
});
app.listen(8888);