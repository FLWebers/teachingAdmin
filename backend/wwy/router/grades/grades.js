/*成绩查询模块*/
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);

connection.connect();

router.post('/',function (req,res,next) {
    var s_username = "'" + req.body.s_username + "'";
    var school_year = "'" + req.body.school_year + "'";
    var semester = "'" + req.body.semester + "'";
    var sql = 'SELECT * FROM evaluate_grades WHERE s_username = ' + s_username + ' AND school_year = ' + school_year + ' AND semester = ' + semester;
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
