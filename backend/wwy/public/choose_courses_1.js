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
    var category = "'" + req.body.category + "'";
    var semester = "'" + req.body.semester + "'";
    var jsonResult;
    /*第一步：根据课程类型和学期在后台筛选所有符合条件的数据*/
    var sql = 'SELECT * FROM courses WHERE category = ' + category + 'AND semester  = ' + semester;
    connection.query(sql,function (error,result) {//error只是表示语法结构错误而已
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "success",
                "data" : null
            };
            res.status(200).send(JSON.stringify(jsonResult));
            next();
        } else {
            sql = 'SELECT course_name FROM evaluate_grades WHERE s_username = ' + username;
            connection.query(sql,function (error,result2) {
                if(error){
                    jsonResult = {
                        "status" : "200",
                        "message" : "success",
                        "data" : null
                    }
                } else {
                    jsonResult = {
                        "status" : "200",
                        "message" : "success",
                        "choosed" : result2,
                        "data" : result
                    };
                }
                res.status(200).send(JSON.stringify(jsonResult));
                next();//不能放在connection.query的外面
            });
        }
    });
});//获取前端传送的课程类型，并将所有结果返回给前端
app.listen(3000);