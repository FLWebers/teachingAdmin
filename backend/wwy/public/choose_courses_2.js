/*该模块用来实现学生端根据展示的课程进行选课*/
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

app.post('/student/chooseCourses2',function (req,res,next) {
    var s_username = "'" + req.body.s_username + "'";
    var t_username = "'" + req.body.t_username + "'";
    var course_name = "'" + req.body.course_name + "'";
    var course_time = "'" + req.body.course_time + "'";
    var sql = 'INSERT evaluate_grades(s_username,t_username,course_name,grades,evaluate_status,evaluate_result,course_time)'+
        ' VALUES(' + s_username + ','+ t_username + ','+ course_name + ',' + "'0'" + ',' + 'DEFAULT' + ',' + "'0'" + ',' + course_time + ');' + '';
    console.log('sql1 : ',sql)
    var jsonResult;
    console.log('req.boyd',req.body)
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "error_insert",//在评教课程表中添加该条数据失败
                "data" : null
            };
            res.status(200).send(JSON.stringify(jsonResult));
            next();
        } else {
            sql = 'UPDATE courses SET selected_number = selected_number + 1 WHERE course_name = ' + course_name + ' AND course_time= ' + course_time;
            console.log('sql2',sql)
            connection.query(sql,function (error,result) {
                if(error){
                    jsonResult = {
                        "status" : "200",
                        "message" : "error_update",//在数据库中更新已选人数失败
                        "data" : null
                    }
                } else {
                    jsonResult = {
                        "status" : "200",
                        "message" : "success",
                        "data" : null
                    };
                    console.log('jsonResult',JSON.stringify(jsonResult));
                }
                res.status(200).send(JSON.stringify(jsonResult));
                next();
            })
        }
    });
});
app.listen(3000);