const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// main file um eine antwort an den browser zu schicken
require('./router/main')(app);

// lädt die static files
app.use(express.static(__dirname + "/views"));
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port
    console.log("Example app listening at http://127.0.0.1:%s", port);
});

