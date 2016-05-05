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


    function sendForm(form) {

        if (!checkInfo()) {
            return false;
        }
        else {


            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/http://139.59.134.26/ ', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(formData)

            return false;
        }
    }




