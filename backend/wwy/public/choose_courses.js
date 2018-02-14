/*学生选课模块*/

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
// var router = express.Router();

var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '981019',
    database : 'teaching_admin'
});
connection.connect();//连接之后不能进行多次连接，所有必须放在post的外面
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post('/student/courses',function (req,res,next) {
    var type = "'" + req.body.type + "'";
    var sql = 'SELECT * FROM courses WHERE category = ' + type;
    var jsonResult;
    connection.query(sql,function (error,result) {
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
        res.status(200).send(jsonResult);
        next();//不能放在connection.query的外面
    });
});//获取前端传送的课程类型，并将所有结果返回给前端
app.listen(3000);