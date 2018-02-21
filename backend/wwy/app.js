/*学生端入口*/
var express = require('express');
var mysql = require('mysql');
var bodyPaser = require('body-parser');
var app = express();
// var fs = require('fs');
var multiparty = require('connect-multiparty');
// var multipartyMiddleware = multiparty();
var path = 'C:\\Users\\hp\\Desktop\\temp_test';
app.use(bodyPaser.urlencoded({extended : false}));
app.use(multiparty({uploadDir : path}));//设置上传文件存放的地址。

var appHeader = require('./router/general/setHeader');
appHeader.setHeader(app);

var status1 = require('./router/status/status1');
var changePassword = require('./router/change_password/changePassword');
var chooseCourses1 = require('./router/chooseCourses/chooseCourses1');
var chooseCourses2 = require('./router/chooseCourses/chooseCourses2');
var courses = require('./router/courses/courses');
var evaluate1 = require('./router/evaluate/evaluate1');
var evaluate2 = require('./router/evaluate/evaluate2');
var test = require('./router/test/test');
var grades = require('./router/grades/grades');
var homeworks1 = require('./router/homeworks/homeworks1');
var homeworks2 = require('./router/homeworks/homeworks2');
var login = require('./router/login/login');
var resources =require('./router/resources/resources');

app.use('/',status1);
app.use('/changePassword',changePassword);
app.use('/student/chooseCourses1',chooseCourses1);
app.use('/student/chooseCourses2',chooseCourses2);
app.use('/student/courses',courses);
app.use('/student/evaluate1',evaluate1);
app.use('/student/evaluate2',evaluate2);
app.use('/student/test',test);
app.use('/student/grades',grades);
app.use('/student/homeworks1',homeworks1);
app.use('/student/homeworks2',homeworks2);
app.use('/login',login);
app.use('/resources',resources);

app.listen(3000);