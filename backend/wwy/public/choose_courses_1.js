/*学生选课模块1，用于接收前端传的学号，课
程类型，学期,并返回未选择的所有课程信息给前端*/

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));

var dbConnection = require('./db_connection');
var connection = dbConnection.connectMysql(mysql);//再仔细想想,调用db_connection.js

connection.connect();//连接之后不能进行多次连接，所有必须放在post的外面

var appHeader = require('./set_header');
appHeader.setHeader(app);
app.post('/student/chooseCourses1',function (req,res,next) {
    var username = "'" + req.body.username + "'";
    var type = "'" + req.body.type + "'";
    var semester = "'" + req.body.semester + "'";
    var jsonResult;
    var sql = 'SELECT course_name FROM evaluate_grades WHERE s_username = ' + username;
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "success",
                data : null
            }
        } else {
            jsonResult = {
                "status" : "200",
                "message" : "success",
                data : result
            };
            console.log('course_name : ',result);
        }
        res.status(200).send(jsonResult);
            next();//不能放在connection.query的外面
    });
    // sql = 'SELECT * FROM courses WHERE category = ' + type + 'AND semester = ' + semester;
    // connection.query(sql,function (error,result) {
    //     if (error){
    //         console.log('error : ' + error.message);
    //         jsonResult = {//返回json形式的数据
    //             "status" : "200",
    //             "message" : "success",
    //             data : null
    //         }
    //     }
    //     else {
    //         jsonResult = {
    //             "status" : "200",
    //             "message" : "success",
    //             data : result
    //         }
    //     }
    //     res.status(200).send(jsonResult);
    //     next();//不能放在connection.query的外面
    // });
});//获取前端传送的课程类型，并将所有结果返回给前端
app.listen(3000);