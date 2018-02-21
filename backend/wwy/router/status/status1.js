/**学籍信息模块**/

var express = require('express');
var router =express.Router();
var mysql = require('mysql');

var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();
var sql = 'SELECT * FROM students';
connection.query(sql,function (error,results) {
    var jsonResult;
    if (error){
        console.log('error : ' + error.message);
        jsonResult = {//返回json形式的数据
            "status" : "200",
            "message" : "success",
            "data" : null
        }
    }
    else {
        jsonResult = {
            "status" : "200",
            "message" : "success",
            data : results
        }
    }
    router.get('/',function (req,res,next) {//学籍查询
        res.status(200).send(JSON.stringify(jsonResult));
        next();
    });
});
module.exports = router;