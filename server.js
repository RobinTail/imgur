var express = require('express');
var app = express();
var routes = require('./routes');

// each request
app.use(logger);

if (process.env.NODE_ENV !== 'production') {
    console.log('Using webpack dev middleware');
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackCompiler = webpack(require('./webpack.config'));
    app.get('/index.js', webpackDevMiddleware(webpackCompiler, {
        noInfo: true
    }));
} else {
    console.log('Using webpack build');
}

routes(app, express);

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Serving at %s:%s', host, port);
});

function logger(req, res, next) {
    console.log('Requested %s for %s', req.method, req.originalUrl);
    next();
}
