/*学生评教模块1,向前端发送该生所有评教信息*/

var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();

router.post('/',function (req,res,next) {
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
module.exports = router;