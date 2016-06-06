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
app.use('/socket.io-client', express.static(__dirname + '/../node_modules/socket.io-client'));

let connectedUsers = new Set();
let historyMaxLength = 20;
let historyRing = new Array(historyMaxLength);
let historyCurrentIndex = -1;
let historyLength = 0;

function nameAvailable(nameToCheck) {
    for (let [name] of connectedUsers) {
        if (name == nameToCheck) {
            return false;
        }
    }
    return true;
}

io.on('connection', function(socket){

    socket.on('join', (name) => {
        if (!nameAvailable(name)) {
            socket.emit('name_clash', name);
        } else {
            socket.removeAllListeners('join');
            connectedUsers.add([name, socket]);

            socket.on('message', (message) => {
                historyCurrentIndex = (historyCurrentIndex + 1) % historyMaxLength;
                historyLength = Math.min(historyLength + 1, historyMaxLength);
                historyRing[historyCurrentIndex] = [name, message];
                connectedUsers.forEach(([, socket]) => socket.emit('message', [name, message]))
            });
            socket.on('disconnect', () => {
                connectedUsers.delete([name, socket]);
                connectedUsers.forEach(([, socket]) => socket.emit('leave', name))
            });

            let history = [];
            for (let i = 0; i < historyLength; ++i) {
                history.unshift(historyRing[(historyCurrentIndex - i + historyMaxLength) % historyMaxLength]);
            }
            socket.emit('joined', [history, name]);
            for (let [n, socket] of connectedUsers) {
                if (n != name) {
                    socket.emit('join', name)
                }
            }
        }
    });
});

var server = http.listen(3000, function () {
    var port = server.address().port;
    console.log("Example app listening at http://127.0.0.1:%s", port);
});

