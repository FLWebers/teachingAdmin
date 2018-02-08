var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '981019',
    database : 'test2'
})
connection.connect();
connection.query('SELECT 1+ 1 AS SOLUTION',function (error,result,fields) {
    if(error) throw error;
    console.log('The solution is : ',result[0].SOLUTION);
    console.log(result[0]);
})