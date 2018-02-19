/*学生评教模块1,向前端发送该生所有评教信息*/

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));

var dbConnection = require('./db_connection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();
var appHeader = require('./set_header');

appHeader.setHeader(app);
app.post('/student/evaluate1',function (req,res,next) {
    var s_username = req.body.s_username;
    var jsonResult;
    var sql = 'SELECT * FROM evaluate_grades WHERE s_username = ' + s_username;
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "can't connect to db",
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