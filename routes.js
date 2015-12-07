var path = require('path');

module.exports = function(app, express) {
    app.use('/', express.static('static'));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
    });
};
