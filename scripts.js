document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    let currentLanguage = 'en';
    
    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-experience': 'Experience',
            'nav-education': 'Education',
            'nav-skills': 'Skills'
        },
        es: {
            'nav-home': 'Inicio',
            'nav-about': 'Sobre mí',
            'nav-experience': 'Experiencia',
            'nav-education': 'Educación',
            'nav-skills': 'Habilidades'
        }
    };

function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';

    // Cambia el atributo lang en <html>
    document.getElementById('html-root').setAttribute('lang', currentLanguage);

    // Mostrar el idioma al que se va a CAMBIAR, no el actual
    const nextLang = currentLanguage === 'en' ? 'ES' : 'EN';
    document.getElementById('current-lang').textContent = nextLang;

    // Traducir elementos con data-en / data-es
    const elementsToTranslate = document.querySelectorAll('[data-en][data-es]');
    elementsToTranslate.forEach(element => {
        const translation = element.getAttribute(`data-${currentLanguage}`);
        if (translation) {
            if (element.innerHTML.includes('<strong>') || element.innerHTML.includes('<span>')) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = translation;
                element.innerHTML = tempDiv.innerHTML;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Guardar preferencia
    localStorage.setItem('preferredLanguage', currentLanguage);
    console.log(`Language switched to: ${currentLanguage.toUpperCase()}`);
}


    // Initialize language from localStorage or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        switchLanguage();
    }

    // Language toggle button event listener
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
    }

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.scroll-animate');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Add scroll animation class to elements
    function addScrollAnimationClasses() {
        const animateElements = document.querySelectorAll('.timeline-item, .education-card, .skill-item, .tool-item, .contact-item');
        animateElements.forEach(element => {
            element.classList.add('scroll-animate');
        });
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = skillBar.getAttribute('data-level');
                    setTimeout(() => {
                        skillBar.style.width = level + '%';
                    }, 200);
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // // Initialize typing animation
    // function initTypingAnimation() {
    //     const heroTitle = document.querySelector('.hero-title');
    //     if (heroTitle) {
    //         const originalText = heroTitle.innerHTML;
    //         setTimeout(() => {
    //             typeWriter(heroTitle, originalText, 50);
    //         }, 1000);
    //     }
    // }

    // Add hover effects to cards
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.timeline-content, .education-card, .tool-item, .contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Parallax effect for hero section
    function addParallaxEffect() {
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroImage = document.querySelector('.hero-image');
                if (heroImage) {
                    const rate = scrolled * -0.3;
                    heroImage.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    }

    // Add loading animation
    function addLoadingAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Add click ripple effect
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .social-link, .nav-link, .language-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 1000);
            });
        });
    }

    // Initialize functions
    addScrollAnimationClasses();
    animateSkillBars();
    // initTypingAnimation();
    addCardHoverEffects();
    addParallaxEffect();
    addLoadingAnimation();
    addRippleEffect();
});