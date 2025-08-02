// Mobile Navigation Handler
(function() {
    'use strict';
    
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.header__nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !expanded);
            
            // Toggle active class
            this.classList.toggle('active');
            nav.classList.toggle('open');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = expanded ? '' : 'hidden';
        });
        
        // Close menu when clicking nav links
        nav.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                mobileToggle.classList.remove('active');
                nav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                mobileToggle.classList.remove('active');
                nav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on resize if desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                nav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
})();