document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            navUl.classList.toggle('show');
        });
    }

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop(); // Get the current page file name

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.closest('li').classList.add('active');
        }
    });
});