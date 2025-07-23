document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const currentlyActive = document.querySelector('.faq-item.active');
        const faqItem = item.closest('.faq-item');

        if (currentlyActive && currentlyActive !== faqItem) {
            currentlyActive.classList.remove('active');
        }

        faqItem.classList.toggle('active');
    });
});