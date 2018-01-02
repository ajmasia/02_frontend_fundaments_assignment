// Active menu change

// Select all navbars items
const menuItems = document.querySelectorAll('.navbar__list > .navbar__item');

// handler function for navbar clik events
function handler() {
    console.log(`Actual menu: ${this.innerText}`);

    menuItems.forEach( item => item.classList.remove('navbar__item--active'));
    this.classList.add('navbar__item--active');

}

// navbar item click events listener
menuItems.forEach( itemMenu => itemMenu.addEventListener('click', handler));