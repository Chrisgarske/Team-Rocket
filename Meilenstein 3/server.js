const express = require('express');
const app = express();
const ip = '127.0.0.1';
const port = 3000;


// main file um eine antwort an den browser zu schicken
require('./router/main')(app);


// lädt die static files
app.use(express.static(__dirname + "/views"));
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));

http.listen(port, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});