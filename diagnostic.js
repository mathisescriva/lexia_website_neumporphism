// Script pour la page Diagnostic - Lexia
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // EFFET SCROLL NAVBAR NEUMORPHIQUE
    // ====================================
    
    const navbarElement = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Ajouter la classe 'scrolled' si on a scrollé de plus de 50px
        if (currentScrollY > 50) {
            navbarElement.classList.add('scrolled');
        } else {
            navbarElement.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    };
    
    // Écouter le scroll avec throttling pour les performances
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleNavbarScroll, 10);
    }, { passive: true });
    
    // ====================================
    // NAVIGATION ET LIENS
    // ====================================
    
    // Gestion du lien breadcrumb vers l'accueil
    const breadcrumbLink = document.querySelector('.breadcrumb-link');
    if (breadcrumbLink) {
        breadcrumbLink.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Navigation - mettre l'onglet "Diagnostic IA" actif
    const navRadios = document.querySelectorAll('.radio-inputs .radio input');
    
    navRadios.forEach(radio => {
        // Marquer "diagnostic" comme actif sur cette page
        if (radio.value === 'diagnostic') {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function() {
            if (this.checked) {
                const sectionId = this.value;
                console.log('🧭 Navigation depuis diagnostic vers:', sectionId);
                
                if (sectionId === 'accueil') {
                    window.location.href = 'index.html';
                } else if (sectionId === 'diagnostic') {
                    // Rester sur cette page - scroll vers le haut
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (sectionId === 'services') {
                    window.location.href = 'services.html';
                } else {
                    // Rediriger vers la page principale avec l'ancre pour À propos et Contact
                    window.location.href = `index.html#${sectionId}`;
                }
            }
        });
    });
    
    // ====================================
    // ANIMATIONS AU SCROLL
    // ====================================
    
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    const animatableElements = document.querySelectorAll(
        '.hero-text-content, .hero-image-section, .step-item, .guarantee-card, .conclusion-container'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
    
    // ====================================
    // CAROUSEL TÉMOIGNAGES DIAGNOSTIC IA
    // ====================================
    
    // Initialiser le carousel des témoignages du diagnostic
    if (document.querySelector('.testimonials-diagnostic-section')) {
        initDiagnosticTestimonialsCarousel();
    }

    // ====================================
    // GESTION DES BOUTONS CTA
    // ====================================
    
    // Boutons CTA - redirection vers la page principale avec modal contact
    const ctaButtons = document.querySelectorAll('.cta-btn, .contact-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Rediriger vers la page principale et ouvrir le modal contact
            window.location.href = 'index.html#contact';
        });
    });
    
    // Bouton CTA final "Lancer votre diagnostic IA 360"
    const finalCtaBtn = document.getElementById('finalCtaBtn');
    if (finalCtaBtn) {
        finalCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Rediriger vers la page contact
            window.location.href = 'contact.html';
        });
    }
    
    // Boutons de bénéfices (informations uniquement, pas de clic)
    const benefitBtns = document.querySelectorAll('.benefit-btn');
    benefitBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Animation de clic pour feedback visuel
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // ====================================
    // EFFETS HOVER CARDS - DÉSACTIVÉS
    // ====================================
    
    // Les effets hover sur les cartes sont désactivés pour un UI statique
    // const cards = document.querySelectorAll('.guarantee-card, .step-item');
    // cards.forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-5px) scale(1.02)';
    //     });
    //     
    //     card.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0) scale(1)';
    //     });
    // });
    
    console.log('✅ Script diagnostic.js chargé avec succès');
});

// ====================================
// FONCTION CAROUSEL TÉMOIGNAGES DIAGNOSTIC IA
// ====================================

function initDiagnosticTestimonialsCarousel() {
    const track = document.getElementById('diagnosticTestimonialsTrack');
    const prevBtn = document.getElementById('diagnosticTestimonialPrev');
    const nextBtn = document.getElementById('diagnosticTestimonialNext');
    const dots = document.querySelectorAll('.testimonials-diagnostic-section .dot');
    
    if (!track || !prevBtn || !nextBtn || !dots.length) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;
    
    // Aller à une diapositive spécifique
    const goToSlide = (index) => {
        if (isAnimating || index === currentIndex || index < 0 || index >= totalCards) return;
        
        isAnimating = true;
        currentIndex = index;
        
        // Animer le track
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Mettre à jour les boutons
        updateNavigationButtons();
        
        // Libérer l'animation après la transition
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    };
    
    // Mettre à jour l'état des boutons de navigation
    const updateNavigationButtons = () => {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentIndex === totalCards - 1 ? 'none' : 'auto';
    };
    
    // Navigation précédente
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
    
    // Navigation suivante
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Navigation par dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-play
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            const nextIndex = currentIndex === totalCards - 1 ? 0 : currentIndex + 1;
            goToSlide(nextIndex);
        }, 5000); // 5 secondes
    };
    
    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    };
    
    // Support tactile
    let startX = 0;
    let isDragging = false;
    
    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    };
    
    const handleTouchEnd = (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < totalCards - 1) {
                goToSlide(currentIndex + 1);
            } else if (diffX < 0 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
        
        isDragging = false;
        setTimeout(startAutoPlay, 3000); // Redémarrer l'auto-play après 3s
    };
    
    // Event listeners tactiles
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Pause auto-play au hover
    const testimonialSection = document.querySelector('.testimonials-diagnostic-section');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopAutoPlay);
        testimonialSection.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Initialisation
    updateNavigationButtons();
    startAutoPlay();
    
    console.log('✅ Carousel témoignages diagnostic initialisé !');
} 