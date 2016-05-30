var express    =    require('express');
var app        =    express();

// main file um eine antwort an den browser zu schicken
require('./router/main')(app);
// Ort wo die html Dokumente liegen
app.set('views',__dirname + '/views');
// EJS als Hilfe für html rendering
app.set('view engine', 'ejs');
// server bekommt gesagt dass wir html files rendern
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + "/views"));

// lädt die static files
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));

var server     =    app.listen(3000,function(){
    console.log("Express is running on port 3000");
});