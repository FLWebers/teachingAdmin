/*登陆模块*/
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
// var cookieParser = require('cookie-parser');


var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();

router.post('/',function (req,res,next) {
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
                "message" : "error",
                "data" : null
            };
            console.log('error');
        }
        else {
            jsonResult = {
                "status" : "200",
                "message" : "success",
                "data" : null
            }
        }
        res.send(jsonResult);
        next();
    });
});
module.exports = router;




