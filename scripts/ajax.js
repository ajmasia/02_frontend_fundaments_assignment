// Ajax request implementation scripts

var xhr = new XMLHttpRequest();

// getData from server function 
function getData() {
    
    makeRequest('GET', 'http://localhost:8000/api/task', null, function(data) {
        
        var response = JSON.parse(data);
        var div = document.createElement('div');
        var children = "";
        response.forEach(element => {
        children += '<p>' + element.name + '</p>';
        children += '<p>' + element.email + '</p>';
        children += '<p>' + element.phone + '</p>';
        children += '<p>' + element.message + '</p>';
        children += '<p>' + element.contact + '</p></br>';
    
    });

    div.innerHTML = children;
    form.appendChild(div);

  });
}

// CreateData function
function createData(data) {
    makeRequest('POST', 'http://localhost:8000/api/task', data, function() {
        console.log("Datos creados correctamente");
    });
}

// MakeRequest function
function makeRequest(method, url, body, callbackSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callbackSuccess(xhr.responseText);
        }
    };

    if (body) {
        xhr.send(JSON.stringify(body));
    } else {
        xhr.send();
    }
}

// createData();
getData();