document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const faqItem = item.closest('.faq-item');
        faqItem.classList.toggle('active');
    });
});