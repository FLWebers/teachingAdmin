/*该模块为自定义设置res.headr的模块*/
function setHeader(app) {
    app.all('*', function(req, res, next) {//不设置res.header会报错
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
}
exports.setHeader = setHeader;