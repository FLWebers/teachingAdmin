/*登陆模块*/
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
// app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

var dbConnection = require('./db_connection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();

var appHeader = require('./set_header');
appHeader.setHeader(app);

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




