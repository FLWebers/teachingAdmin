/*考试安排模块*/
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);

connection.connect();
router.post('/',function (req,res,next) {
    var username = "'" + req.body.username + "'";
    var jsonResult;
    var sql = 'SELECT * FROM test WHERE username = ' + username;
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

module.exports = router;