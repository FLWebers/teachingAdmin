var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var path = 'C:\\Users\\hp\\Desktop\\temp_test';

var dbConnection = require('../general/dbConnection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();

router.post('/',multipartyMiddleware,function (req,res,next) {
    var s_username = "'" + req.body.s_username + "'";
    var homework_title = "'" + req.body.homework_title + "'";
    path = path + '\\' + req.body.s_username + '\\' +req.body.homework_title;
    createDir(path);
    function createDir(path) {
        var pathArray = path.split('\\');
        console.log('length : ',pathArray.length);
        for(var i = 0;i < pathArray.length;i++){
            var currentPath =pathArray.slice(0,i+1).join('\\');
            var isExist = fs.existsSync(currentPath);
            !isExist ? fs.mkdirSync(currentPath) : null;//文件夹路径不存在时创建该路径
        }
    }
    var oldName = req.files.file.originalFilename;
    var fileSuffix = oldName.split('.')[1];//获取文件的后缀
    var newName = s_username + '' + homework_title + '.' + fileSuffix;
    var oldPath = req.files.file.path;
    var newPath = path + '\\' + newName;
    var mysqlPath = newPath.replace(/\\/g,'\\\\');//注意mysql存入路径转意问题
    var sql = 'UPDATE homework SET submit_status = 1,file_path = ' + "'" +mysqlPath + "'" + ' WHERE s_username = ' + s_username + ' AND homework_title = ' + homework_title;
    var jsonResult;
    fs.rename(oldPath,newPath,function (err) {
        if(err){
            console.log('fail');
        } else{
            console.log('rename success');
        }
    });
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