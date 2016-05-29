module.exports = function(app)
{
    app.get('/index',function(req,res){
        res.render('index.html')
    });
    app.get('/players',function(req,res){
        res.render('players.html');
    });
    app.get('/home',function(req,res){
        res.render('home.html');
    });
}