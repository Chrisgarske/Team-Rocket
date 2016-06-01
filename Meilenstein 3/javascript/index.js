var URL = 'http://127.0.0.1:3000/api/players';

// Wird aufgerufen wenn html geladen wurde
window.addEventListener("DOMContentLoaded", function () {
    // Hilfsfunktion
    function updatePlayer() {
        getPlayers(favoritesCheckbox.checked, function (players) {
            updateTable(playerTable, players);
        });
    }
    // Inizialisiert die Spielertabelle
    var playerTable = document.querySelector("#playertable > table")
    if (playerTable) {
        var favoritesCheckbox = document.getElementById("favorites");
        favoritesCheckbox.addEventListener("change", function () {
            updatePlayer();
        })
        updatePlayer();
    }
    // Inizialisiert das Absenden des Forumulares
    var addPlayerForm = document.querySelector("#addplayer > form")
    if (addPlayerForm) {
        addPlayerForm.addEventListener("submit", function (e) {
            e.preventDefault()
            sendForm(e.target);
        })
    }
})

// Formularvalidierung
function checkInfo() {

    var vorname = document.getElementsByName('vorname')[0].value;
    var name = document.getElementsByName("name")[0].value;
    var verein = document.getElementsByName("verein")[0].value;
    var headcoach = document.getElementsByName("hcoach")[0].value;
    var assistant = document.getElementsByName("acoach")[0].value;
    var regexName = /^[a-zA-ZÄ-Üä-ü]+$/;

    if (!vorname.match(regexName)
        || !name.match(regexName)
        || !verein.match(regexName)
        || !headcoach.match(regexName)
        || !assistant.match(regexName)) {

        alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");
        return false;

    }
    else {
        return true;
    }
}

// Sendet Formular und zeigt Statusmeldung
function sendForm(form) {

    if (checkInfo()) {
        var formData = new FormData(form);
        request("POST", URL, formData, function (error) {
            if (error !== null) {
                alert('Es ist ein Fehler aufgetreten!');
                return;
            }
            alert('Ihre Daten wurden erfolgreich gesendet');
        });

    }
}

// Lädt Spielerdaten und zeigt Statusmedlung
function getPlayers(favorite, callback) {
    request("GET", URL + "?favorites=" + !!favorite, null, function (error, response) {
        if (error !== null) {
            alert("Daten konnten nicht geladen werden!")
            return;
        }
        var players = JSON.parse(response);
        callback(players);
    });


}

/* Allgemeine request Funktion, führt AJAX Request aus
 (AJAX ermöglicht es Inhalte dynamisch nachzuladen,
 ohne dass die komplette Seite neu geladen werden muss) */
function request(method, url, formData, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(formData);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                callback(null, xhr.responseText);
            }
            else {
                callback(xhr.status, xhr.responseText);
            }
        }
    };

}

//Läd Spielerdaten in die Tabelle und löscht alte Spielerdaten

function updateTable(table, players) {

    function tableCell(content) {
        var td = document.createElement('td');
        td.innerHTML = content;
        return td;
    }
    // siehe http://stackoverflow.com/a/18129752
    [].slice.call(table.querySelectorAll(".player")).forEach(function (tr) {
        table.removeChild(tr);
    });
    players.forEach(function (player) {
        var tr = document.createElement('tr');
        tr.className = "player";
        tr.appendChild(tableCell(player.vorname + " " + player.name));
        tr.appendChild(tableCell(player.club));
        tr.appendChild(tableCell(player.coach));
        tr.appendChild(tableCell(player.position));
        tr.appendChild(tableCell(player.number));
        tr.appendChild(tableCell(player.year));
        table.appendChild(tr);
    })
}



