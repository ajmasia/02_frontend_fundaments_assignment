// Change active menu status script with smoothScroll - Click & scroll events

// Select all navbars items
var navbarItems = document.getElementsByClassName('navbar__item');

// Add an event lister for each element menu
for ( var i = 0; i < navbarItems.length; i++ ) {
    navbarItems[i].addEventListener('click', function (event) {
        var goTo = this.getElementsByTagName('a')[0].href.split('#');
        
        // Delete active classs to item
        deleteActiveClass();
        
        // Add active class to item goto
        this.classList.add('navbar__item--active');

        // Smooth scroll
        if ( goTo.length == 2 ) {
            event.preventDefault();
            var sectionToGo = goTo[goTo.length - 1];
            var elementToGo = getElementToScroll(sectionToGo);
            scrollToElement(elementToGo);
        }
    })
}

// Remove active item class function
function deleteActiveClass() {
    
    for ( var i = 0; i < navbarItems.length; i++ ) {
        navbarItems[i].classList.remove('navbar__item--active');
    }

}

// Function to Know where to scroll
function getElementToScroll(id) {
    
    var elem;

    if ( id === '' ) {
        elem = document.getElementsByClassName('header')[0];
    } else {
        elem = document.getElementById(id);
    }
    return elem;

}

// Smoooth scroll function
function scrollToElement(element) {
   
    var jump = parseInt(element.getBoundingClientRect().top * 0.25);
    document.body.scrollTop += jump;
    document.documentElement.scrollTop += jump;

    if ( !element.lastJump || element.lastJump > Math.abs(jump) ) {
        element.lastJump = Math.abs(jump) ;
        setTimeout(function () {
            scrollToElement(element);
        }, 25);
    } else {
        element.lastJump = null;
    }
    
}

// Fucntion to calc acumulative scroll
function acumulativeOffset(element) {
    
    var top = 0;

    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while (element) 

    return top - 40;
}

var aboutMeOffset = acumulativeOffset(document.getElementById('about-me'));
var educationOffset = acumulativeOffset(document.getElementById('education'));
var experienceOffset = acumulativeOffset(document.getElementById('experience'));
var skillsOffset = acumulativeOffset(document.getElementById('skills'));
var interestsOffset = acumulativeOffset(document.getElementById('interests'));
var contactOfset = acumulativeOffset(document.getElementById('contact'));


// Function to change menu style with scroll
function changeMenuStyle(event) {
    var pageOffset = window.pageYOffset;

    if ( pageOffset >= 0 && pageYOffset < aboutMeOffset ) {
        deleteActiveClass();
        document
            .querySelector("a[href$='#home']")
            .parentNode.classList.add('navbar__item--active');
    } else if ( pageYOffset >= aboutMeOffset && pageYOffset < educationOffset ) {
        deleteActiveClass();
        document
            .querySelector("a[href$='#about-me']")
            .parentNode.classList.add('navbar__item--active');
    } else if ( pageYOffset >= educationOffset && pageYOffset < experienceOffset ) {
        deleteActiveClass();
        document
            .querySelector("a[href$='#education']")
            .parentNode.classList.add('navbar__item--active');
    } else if ( pageYOffset >= experienceOffset && pageYOffset < skillsOffset ) {
        deleteActiveClass();
        document
            .querySelector("a[href$='#experience']")
            .parentNode.classList.add('navbar__item--active');
    } else if ( pageYOffset >= skillsOffset && pageYOffset < interestsOffset ) {
        deleteActiveClass();
        document
            .querySelector("a[href$='#skills']")
            .parentNode.classList.add('navbar__item--active');
    } else if ( pageYOffset >= interestsOffset && pageYOffset < contactOfset ) {
        deleteActiveClass();
        document
            .querySelector("a[href$='#interests']")
            .parentNode.classList.add('navbar__item--active');
    } else {
        deleteActiveClass();
        document
            .querySelector("a[href='#contact']")
            .parentNode.classList.add('navbar__item--active');
    }
}

// Add an event lister for detect scroll changes
window.addEventListener('scroll', changeMenuStyle);



// Horizontal elements slider script

//Debounce funtion
function debounce(func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


    var timeout;
    return function () {

        var context = this,
            args = arguments;
        var later = function later() {
            timeout = null;

            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

var sliderItems = document.querySelectorAll('.slide-in');

// Funtion to check slide
function checkSlide() {
    sliderItems.forEach(function (sliderItem) {

        var slideInAt = window.scrollY + window.innerHeight - sliderItem.offsetHeight / 2;
        var imageBottom = sliderItem.offsetTop + sliderItem.offsetHeight;
        var isHalfShown = slideInAt > sliderItem.offsetTop;
        var isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            sliderItem.classList.add('active');
        } else {
            sliderItem.classList.remove('active');
        }

        /* If you want only one animation remove else stament { sliderItem.classList.remove('active'); } */
    });
}

// Add an event lister for detect scroll changes for sliders
window.addEventListener('scroll', debounce(checkSlide));



// Notification functions
function sendNotification(title, body) {
    var notification = Notification || mozNotification || webkitNotification;
  
    if (body) {
      var options = {
        body: body
      };
    }
  
    if ('undefined' === typeof notification) {
      console.warn("Web notification not supported");
    } else {
      notification.requestPermission( function(permission) {
        if ( Notification.permission === 'granted' ) {
          new Notification(title, options);
        }
      });
    }
  }

 
// Fullscreen implement script
var video = document.getElementById('video');

video.addEventListener('click', function(event) {
  launchFullScreen(this);
  this.play();
});

function launchFullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}