export default function (app) {

    const players = require('../players.json');

    app.get('/api/players', (req, res) => {

        let search = req.query.search || 'false';
        let favorits = req.query.favorites;

        if (favorits === 'true') {
            console.log("Got a GET request for the homepage");
            console.log("Nur die Favoriten");
            return res.status(200).json(players.filter(p => p.favorit));
        }
        else if (favorits === 'false') {
            console.log("Got a GET request for the homepage");
            console.log("Alle Player");
            return res.status(200).json(players);
        }
        else if (search !== 'false') {
            console.log("Got a GET request for the homepage");
            console.log("Suche nach einem Spieler")
            return res.status(200).json(players.filter(p => p.name.charAt(0) === search));
        }
        else
            return res.status(404).json({message: 'Error: 404'})
    });

    app.put('/api/players/:id', (req, res) => {
        console.log('Got a PUT request for Player with ID' + req.params.id);
        res.status(200).json({"message": "Spieler mit der ID" + req.params.id + "wurde erfolgreich geupdateed"})
    });

    app.post('/api/players', (req, res) => {
        console.log('POST request to homepage');
        if (req.body) {
            return res.status(200).json({message: 'Spieler wurde erfolgreich gespeichert'})
        }
        else
            return res.status(404).json({message: 'Error: 404'})
    });

    app.delete('/api/players/:id', (req, res) => {
        console.log('DELETE request to homepage');

        if (!where(players, {id: req.params.id})) {
            res.status(404).json('Der genannte Spieler existiert nicht');
        } else {
            let filtered = _.filter(AllPlayers, function (e) {
                return !(e.id === req.params.id);
            });
            AllPlayers = filtered;
            res.status(200).json(filtered);
        }
    });

}