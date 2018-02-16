var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.post('/test',function (req,res,next) {
    console.log('req',req.body);
    next();
});
app.listen(3000);