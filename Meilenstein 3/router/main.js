module.exports = function (app) {

    var _ = require("underscore");
    var players = require('../players.json');

    app.get('/api/players', function (req, res) {
        if (req.query.favorites === 'true') {
            console.log("Got a GET request for the homepage");
            console.log("Nur die Favoriten");
            res.json(_.where(players, {"favorit": true}));
        }
        else
            console.log("Got a GET request for the homepage");
            console.log("Alle Player");
            res.json(players);
    });


}