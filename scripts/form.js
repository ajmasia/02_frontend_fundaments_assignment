// Form validation script

// Get inputs
var form = document.getElementsByName('contact')[0];

var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var messageInput = document.getElementById('message');

var contactBy = {
    contactBy01: document.getElementById('contact-by-01'),
    contactBy02: document.getElementById('contact-by-02'),
    contactBy03: document.getElementById('contact-by-03'),
    contactBy04: document.getElementById('contact-by-04'),
    contactBy05: document.getElementById('contact-by-05')
}
var submitButton = document.getElementById('send');


form.addEventListener('submit', function (event) {

    // ContactBy radio validate
    if ( contactBy.contactBy01.checkValidity() === false ) {
        alert("Tienes que seleccionar cómo has contactado conmigo");
        event.preventDefault();
        return false;
    }

    // Name input validate
    if ( nameInput.checkValidity() === false ) {
        alert('Por favor, escribe tu nombre');
        nameInput.focus();
        event.preventDefault();
        return false;
    }
    
    // Mail input validate
    var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
    var resultEmailValidation = regex.test(emailInput.value);

    if (resultEmailValidation === false) {
            alert("por favor, escribe un mail correcto");
            emailInput.focus();
            event.preventDefault();
            return false;
    }

    // Phome input validate
    var regex = /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/;
    var resultPhoneValidation = regex.test(phoneInput.value);

    if (resultPhoneValidation === false) {
        alert("Por favor, escribe tu número de teléfono de forma correcta en formato +00 000 000 000");
        phoneInput.focus();
        event.preventDefault();
        return false;
    }

    // Message input validate
    var messageInputValue = document.getElementById('message').value;
    
    if ( messageInput.checkValidity() === false || wordCounter(messageInputValue) === null ) {
        console.log(wordCounter(messageInputValue));
        alert('No has escrito nada en el campo mensaje');
        messageInput.focus();
        event.preventDefault();
        return false;
    }

    if ( messageInput.checkValidity() === false || wordCounter(messageInputValue) > 150 ) {
        console.log(wordCounter(messageInputValue));
        alert('No puedes escribir más de 150 palabras en el campo mensaje');
        messageInput.focus();
        event.preventDefault();
        return false;
    }
    
    // If all ok them save data to server
    submitButton.setAttribute('disabled', '');
    event.preventDefault();

    // Getting ContactBy radio value
    for (var radio in contactBy){    
        if ( contactBy[radio].checked === true ) {
            var contactByValue = contactBy[radio].value;
        }
    }

    // Getting inputs values
    var nameInputValue = document.getElementById('name').value;
    var emailInputValue = document.getElementById('email').value;
    var phoneInputValue = document.getElementById('phone').value;
    var messageInputValue = document.getElementById('message').value;

    // Create object data form input values
    data = {
        contact: contactByValue,
        name: nameInputValue,
        email: emailInputValue,
        phone: phoneInputValue,
        message: messageInputValue
    }

    // Save data and reset form
    createData(data);
    sendNotification('Formulario enviado correctamente', 'Gracias por ponerte en contacto conmigo. En breve recibirás noticias mias');
    submitButton.removeAttribute("disabled");
    form.reset();
    
})

// Word counter fucntion
function wordCounter(data) {
    var words = data.trim().split(' ');
    if ( words[0] === '') {
        return null;
    } else {
        return words.length;
    }
}