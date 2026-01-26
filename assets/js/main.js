/**
 * Main JS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle?.querySelector('i');
    const rtlIcon = rtlToggle?.querySelector('i');
    const bootstrapCssLink = document.getElementById('bootstrap-css');

    // Check local storage
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    const currentDir = localStorage.getItem('dir') || 'ltr';
    setDir(currentDir);

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const newDir = htmlElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            setDir(newDir);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update Icon (if using FontAwesome or similar)
        if(icon) {
            if(theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
            }
        }
    }

    function setDir(dir) {
        const safeDir = dir === 'rtl' ? 'rtl' : 'ltr';
        htmlElement.setAttribute('dir', safeDir);
        localStorage.setItem('dir', safeDir);

        if (rtlIcon) {
            if (safeDir === 'rtl') {
                rtlIcon.classList.remove('bi-text-right');
                rtlIcon.classList.add('bi-text-left');
            } else {
                rtlIcon.classList.remove('bi-text-left');
                rtlIcon.classList.add('bi-text-right');
            }
        }

        if (bootstrapCssLink) {
            const base = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/';
            bootstrapCssLink.setAttribute('href', `${base}${safeDir === 'rtl' ? 'bootstrap.rtl.min.css' : 'bootstrap.min.css'}`);
        }
    }

    // Scroll to Top
    const backToTop = document.getElementById('back-to-top');
    if(backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('d-none');
            } else {
                backToTop.classList.add('d-none');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initialize Tooltips/Popovers if needed (Bootstrap)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});
