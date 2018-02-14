/*登陆模块*/
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
// app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '981019',
    database : 'teaching_admin'
});
connection.connect();
app.all('*', function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post('/login',function (req,res,next) {
    var jsonResult;
    var username = "'" + req.body.username + "'";
    var password = "'" + req.body.password + "'";
    console.log(req.body);
    var sql = 'SELECT * FROM accounts WHERE username = ' +username + 'AND password = ' + password;
    console.log('sql',sql);
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "success",
                data : null
            };
            console.log('error');
        }
        else {
            jsonResult = {
                "status" : "200",
                "message" : "success",
                data : result
            }
        }
        res.send(jsonResult);
        next();
    });
});
app.listen(3000);




