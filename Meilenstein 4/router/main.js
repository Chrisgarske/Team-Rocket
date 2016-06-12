module.exports = function (app) {

    const bodyParser = require('body-parser');
    let players = require('../players.json');
    app.use(bodyParser.json());

    app.get('/api/players', (req, res) => {

        const search = req.query.search || 'false';
        const favorites = req.query.favorites;

        if (favorites === 'true') {
            console.log("Got a GET request for the homepage");
            console.log("Nur die Favoriten");
            return res.status(200).json(players.filter(p => p.favorit));
        }
        else if (favorites === 'false') {
            console.log("Got a GET request for the homepage");
            console.log("Alle Player");
            return res.status(200).json(players);
        }
        else if (search !== 'false') {
            console.log("Got a GET request for the homepage");
            console.log("Suche nach einem Spieler");
            return res.status(200).json(players.filter(p => p.name.charAt(0) === search));
        }
        else
            return res.status(404).json({message: 'Error: 404'})
    });

    app.put('/api/players/:id', (req, res) => {
        console.log('Got a PUT request for Player with ID' + req.params.id);
        const filteredPlayers = players.filter(p => p.id !== req.params.id);
        if(filteredPlayers.length < players.length){
            res.status(200).json({"message": "Spieler mit der ID" + req.params.id + "wurde erfolgreich geupdated"})
        }
        else
            return res.status(404).json({message: 'Error: 404 Spieler konnte nicht geupdated werden'})
    });

    app.post('/api/players', (req, res) => {
        console.log('POST request to homepage');
        if (req.body) {
            return res.status(200).json({message: 'Spieler wurde erfolgreich gespeichert'})
        }
        else
            return res.status(404).json({message: 'Error: 404 Spieler konnte nicht gespeichert werden'})
    });

    app.delete('/api/players/:id', (req, res) => {
        console.log('DELETE request to homepage');
        const filteredPlayers = players.filter(p => p.id !== req.params.id);
        if (filteredPlayers.length < players.length){
            players = filteredPlayers;
            return res.status(200).json({message: 'Spieler wurde erfolgreich gelöscht'})
        }
        else
            return res.status(404).json({message: 'Error: 404 Spieler konnte nicht gelöscht werden'})
    });

};