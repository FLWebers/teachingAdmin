/*作业模块*/
var express = require('express');
var mysql = require('mysql');
var bodyPaser = require('body-parser');
var app = express();

app.use(bodyPaser.urlencoded({extended : false}));

var dbConnection = require('./db_connection');
var connection = dbConnection.connectMysql(mysql);

connection.connect();

var appHeader = require('./set_header');
appHeader.setHeader(app);

app.post('/student/homework',function (req,res,next) {
    var s_username = "'" + req.body.s_username + "'";
    var homework_title = "'" + req.body.homework_title + "'";
    var sql = 'SELECT * FROM homework WHERE s_username = ' + s_username + ' AND homework_title = ' + homework_title;
    var jsonResult;
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "error",
                "data" : null
            }
        } else {
            jsonResult = {
                "status" : "200",
                "message" : "success",
                "data" : result
            }
        }
        res.status(200).send(JSON.stringify(jsonResult));
        next();
    });
});
app.listen(3000);