var express = require('express');
var app = express();

// main file um eine antwort an den browser zu schicken
require('./router/main')(app);

// lädt die static files
app.use(express.static(__dirname + "/views"));
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);

});