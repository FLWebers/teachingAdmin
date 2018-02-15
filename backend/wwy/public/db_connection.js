/*该模块为连接数据库的公共模块*/
function connectMysql(mysql) {
    var connection = mysql.createConnection({
        host : 'localhost',
        port : '3306',
        user : 'root',
        password : '981019',
        database : 'teaching_admin'
    });
    return connection;
}
exports.connectMysql = connectMysql;
