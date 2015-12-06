var express = require('express');
var app = express();
var routes = require('./routes');

process.title = "serverExpress";

function logger(req, res, next)
{
    console.log("Requested %s for %s", req.method, req.originalUrl );
    next();
}

// each request
app.use(logger);

routes(app, express);

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Serving at %s:%s', host, port);
});