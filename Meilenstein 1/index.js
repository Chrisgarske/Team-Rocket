/**
 * Created by katharinaspinner on 27.04.16.
 */

function check_info() {

    var vorname = document.getElementById('vorname')[0].value;
    var name = document.getElementById("name")[0].value;
    var verein = document.getElementById("verein")[0].value;
    var headcoach = document.getElementById("headcoach")[0].value;
    var assistant = document.getElementById("assistant")[0].value;
    var regex_name = /^[a-zA-ZÄ-Üä-ü]+$/;


    if (!vorname.match(regex_name) || !name.match(regex_name) || !verein.match(regex_name) || !headcoach.match(regex_name) || !assistant.match(regex_name)){
        alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");
        return false;

    }

    return true;

}
