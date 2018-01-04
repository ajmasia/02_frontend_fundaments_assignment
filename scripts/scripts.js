// Active menu change

// Select all navbars items
const menuItems = document.querySelectorAll('.navbar__list > .navbar__item');

// handler function for navbar clik events
function handler() {
    menuItems.forEach( item => item.classList.remove('navbar__item--active'));
    this.classList.add('navbar__item--active');
}

// navbar item click events listener
menuItems.forEach( itemMenu => itemMenu.addEventListener('click', handler));




// sliders
function debounce(func, wait = 20, immediate = true) {
            
    var timeout;
    return function() {
    
        var context = this, args = arguments;
        var later = function() {
        timeout = null;
    
        if ( !immediate ) func.apply(context, args);
        };
        
        var callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        
        timeout = setTimeout(later, wait);
        
        if ( callNow ) func.apply(context, args);
    };
}

const sliderItems = document.querySelectorAll('.slide-in');

function checkSlide() {
    sliderItems.forEach( sliderItem => {
        
        const slideInAt = ( window.scrollY + window.innerHeight ) - sliderItem.offsetHeight / 2;
        
        const imageBottom = sliderItem.offsetTop + sliderItem.offsetHeight;
        
        const isHalfShown = slideInAt > sliderItem.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        console.log(sliderItem, sliderItem.offsetHeight, sliderItem.offsetTop);
        console.log(isHalfShown, isNotScrolledPast)
        
        if ( isHalfShown && isNotScrolledPast ) {
            sliderItem.classList.add('active');
        } else {
            sliderItem.classList.remove('active');
        }
        
    });
}

window.addEventListener('scroll', debounce(checkSlide));