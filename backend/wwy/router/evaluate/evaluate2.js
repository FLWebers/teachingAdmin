/*学生评教模块2,获取前端发送的评教结果*/

var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);

connection.connect();

router.post('/',function (req,res,next) {
    var s_username = "'"+ req.body.s_username + "'";
    var t_username = "'"+ req.body.t_username + "'";
    var evaluate_result = "'"+ req.body.evaluate_result + "'";
    var course_name = "'"+ req.body.course_name + "'";
    var comment = "'"+ req.body.comment + "'";
    var jsonResult;
    var sql = 'UPDATE evaluate_grades SET evaluate_result =' + evaluate_result +',comment = ' + comment + ' WHERE s_username =' + s_username +
    ' AND t_username =' +t_username +' AND course_name =' + course_name;
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "error",
                "data" : null
            }
        } else{
            jsonResult = {
                "status" : "200",
                "message" : "success",
                "data" : null
            }
        }
        res.status(200).send(JSON.stringify(jsonResult));
        next();
    });
});
module.exports = router;