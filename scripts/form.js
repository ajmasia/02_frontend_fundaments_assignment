// Form validation script

// Get inputs
var form = document.getElementsByName('contact')[0];

var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var messaageInput = document.getElementById('message');

var contactBy = {
    contactBy01: document.getElementById('contact-by-01'),
    contactBy02: document.getElementById('contact-by-02'),
    contactBy03: document.getElementById('contact-by-03'),
    contactBy04: document.getElementById('contact-by-04'),
    contactBy05: document.getElementById('contact-by-05')
}
var submitButton = document.getElementById('send');


form.addEventListener('submit', function (event) {
    
    if ( contactBy.contactBy01.checkValidity() === false ) {
        alert("Tienes que seleccionar cómo has contactado conmigo");
        event.preventDefault();
        return false;
    }

    if ( nameInput.checkValidity() === false ) {
        alert('Tienes que escribir tu nombre');
        nameInput.focus();
        event.preventDefault();
        return false;
    }
    
    var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
    var resultEmailValidation = regex.test(emailInput.value);

  if (resultEmailValidation === false) {
        alert("Tienes que escribir un email correcto");
        emailInput.focus();
        event.preventDefault();
        return false;
  }

    var regex = /^((\+?34([ \t|\-])?)?[9|6|7]((\d{1}([ \t|\-])?[0-9]{3})|(\d{2}([ \t|\-])?[0-9]{2}))([ \t|\-])?[0-9]{2}([ \t|\-])?[0-9]{2})$/;
    var resultPhoneValidation = regex.test(phoneInput.value);

    if (resultPhoneValidation === false) {
        alert("El formato del número de teléfono es incorrecto");
        phoneInput.focus();
        event.preventDefault();
        return false;
    }

    if ( messaageInput.checkValidity() === false ) {
        alert('No has escrito nada en el campo mensaje');
        messaageInput.focus();
        event.preventDefault();
        return false;
    }
    
    submitButton.setAttribute('disabled', '');
    event.preventDefault();

    setTimeout( function() {
        form.reset();
        sendNotification('Formulario enviado correctamente', 'Gracias por ponerte en contacto conmigo. En breve recibirás noticias mias');
        submitButton.removeAttribute("disabled");
    }, 1000 );
    
})



