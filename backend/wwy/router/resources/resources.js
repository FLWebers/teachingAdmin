var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();

router.post('/',function (req,res,next) {
    var username = "'" + req.body.username + "'";
    var jsonResult;
    var sql = 'SELECT role_name FROM accounts WHERE username = ' + username;
    connection.query(sql,function (error,result) {
        if(error){
            jsonResult = {
                "status" : "200",
                "message" : "success",
                "data" : null
            };
            res.status(200).send(JSON.stringify(jsonResult));
            next();
        } else {
            /*使用for循环动态拼接mysql*/
            var role_name = result[0].role_name.split(',');
            sql = 'SELECT * FROM resources WHERE role_name LIKE ';
            if(role_name.length <= 1){
                sql = 'SELECT * FROM resources WHERE role_name LIKE ' + "'%" + role_name [0]+ "%'" ;
            } else {
                sql = 'SELECT * FROM resources WHERE role_name LIKE ' + "'%" + role_name [0]+ "%' OR" ;
                for(var i = 0; i <role_name.length; i++){
                    sql = sql + " '%" + role_name[i] + "%'";
                }
            }
            connection.query(sql,function (error,result) {
                if(error){
                    jsonResult = {
                        "status" : "200",
                        "message" : "can't find role",
                        "data" : null
                    };
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
        }
    });
});
module.exports = router;