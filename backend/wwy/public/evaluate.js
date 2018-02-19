/*学生评教模块*/

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
app.post('/student/evaluate',function (req,res,next) {
    
});