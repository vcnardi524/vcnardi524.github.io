//stationary NAVBAR
function shouldFixNavbar() {
    return window.scrollY > 90; // Fix the navbar after scrolling 100 pixels
}

function handleScroll() {
    const navbar = document.getElementById('navbar');

    if (shouldFixNavbar()) {
        navbar.classList.add('fixed-navbar');
        navbar.style.backgroundColor = "rgb(252, 245, 235)";

    } else {
        navbar.classList.remove('fixed-navbar');
        navbar.style.backgroundColor = "rgb(246, 241, 235)";
    }
}


// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

