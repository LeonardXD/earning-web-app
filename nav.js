document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('mySidebar');
    const closeBtn = document.querySelector('.closebtn');

    if (hamburger && sidebar && closeBtn) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent window click event from firing immediately
            sidebar.style.width = '250px';
        });

        const closeSidebar = () => {
            sidebar.style.width = '0';
        }

        closeBtn.addEventListener('click', closeSidebar);

        // Close sidebar when clicking outside of it on mobile
        window.addEventListener('click', (event) => {
            // Check if the hamburger is visible, which indicates mobile view
            if (window.getComputedStyle(hamburger).display !== 'none') {
                if (event.target !== sidebar && !sidebar.contains(event.target) && event.target !== hamburger) {
                    closeSidebar();
                }
            }
        });
    }

    // Highlight active link
    const navLinks = document.querySelectorAll('.sidebar a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});