var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
const opn = require('opn');


var app = express();
var compiler = webpack(config);

app.use(express.static(path.join(__dirname, '/')))
//use in webpack development mode
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

//use in webpack production mode
//app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3001, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    opn('http://localhost:3001');
    console.log('Listening at http://localhost:3001');
});
