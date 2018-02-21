/*作业模块1:用于展示该生所有作业的概况*/

var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);

connection.connect();

router.post('/',function (req,res,next) {
    var s_username = "'" + req.body.s_username + "'";
    var homework_title = "'" + req.body.homework_title + "'";
    var sql = 'SELECT * FROM homework WHERE s_username = ' + s_username + ' AND homework_title = ' + homework_title;
    var jsonResult;
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