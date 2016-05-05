function spielerAufrufen() {


    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/http://139.59.134.26/', true);
    xhr.responseType = 'json';
    xhr.send();
    var data = xhr.response;



    }



}