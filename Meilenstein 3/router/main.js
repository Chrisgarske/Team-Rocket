module.exports = function (app) {

    const _ = require("underscore");
    const players = require('../players.json');

    app.get('/api/players', function (req, res) {

        var search = req.query.search || 'false';
        var favorits = req.query.favorites;

        if (favorits === 'true') {
            console.log("Got a GET request for the homepage");
            console.log("Nur die Favoriten");
            return res.status(200).json(_.where(players, {"favorit": true}));
        }
        else if (favorits === 'false') {
            console.log("Got a GET request for the homepage");
            console.log("Alle Player");
            return res.status(200).json(players);
        }
        else if (search !== 'false') {
            console.log("Got a GET request for the homepage");
            console.log("Suche nach einem Spieler")
            return res.status(200).json(_.filter(players, function (e) {
                return e.name.charAt(0) === search;
            }));
        }
        else
            return res.status(404).json({message: 'Error: 404'})
    });

    app.put('/api/players/:id', function (req, res) {
        console.log('Got a PUT request for Player with ID' + req.params.id);
        res.status(200).json({"message": "Spieler mit der ID" + req.params.id + "wurde erfolgreich geupdateed"})
    });

    app.post('/api/players', function (req, res) {
        console.log('POST request to homepage');
        if (req.body) {
            return res.status(200).json({message: 'Spieler wurde erfolgreich gespeichert'})
        }
        else
            return res.status(404).json({message: 'Error: 404'})
    });

    app.delete('/api/players/:id', function (req, res) {
        res.send('DELETE request to homepage'); // TO DO
    });

}