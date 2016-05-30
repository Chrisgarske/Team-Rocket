module.exports = function(app)
{
    app.get('/',function(req,res){
        res.render('home.html')
    });
    app.get('/',function(req,res){
        res.render('players.html');
    });
    app.get('/',function(req,res){
        res.render('index.html');
    });


}