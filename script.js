// Script pour la section Hero Lexia
document.addEventListener('DOMContentLoaded', function() {
    
    // Éléments du DOM
    const heroVideo = document.getElementById('heroVideo');
    const replayBtn = document.getElementById('replayBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const contactBtn = document.getElementById('contactBtn');
    
    // Éléments de la navbar
    const navbarElement = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navRadios = document.querySelectorAll('.radio-inputs .radio input');
    const navCtaBtn = document.getElementById('navCtaBtn');
    
    // Alternative directe pour le lien Services (fallback robuste)
    const servicesRadio = document.querySelector('input[value="services"]');
    if (servicesRadio) {
        const servicesLabel = servicesRadio.closest('.radio');
        if (servicesLabel) {
            servicesLabel.style.cursor = 'pointer';
            servicesLabel.addEventListener('click', function(e) {
                console.log('🎯 Clic direct sur Services détecté');
                // Petite pause pour laisser le radio se cocher
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 100);
            });
        }
    }
    
    // ====================================
    // EFFET SCROLL NAVBAR NEUMORPHIQUE
    // ====================================
    
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
    // CAROUSEL DES RÉALISATIONS
    // ====================================
    
    const initRealisationsCarousel = () => {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('navDots');
        
        if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
        
        const cards = track.querySelectorAll('.realisation-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        let isAnimating = false;
        
        // Créer les points de navigation
        const createDots = () => {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('div');
                dot.className = `nav-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        };
        
        // Aller à une diapositive spécifique
        const goToSlide = (index) => {
            if (isAnimating || index === currentIndex) return;
            
            isAnimating = true;
            currentIndex = index;
            
            // Animer le track
            const translateX = -currentIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Mettre à jour les points
            document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
            
            // Mettre à jour les boutons
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalCards - 1;
            
            // Libérer l'animation après la transition
            setTimeout(() => {
                isAnimating = false;
            }, 800);
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
        
        // Support tactile
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;
        
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isDragging = true;
            track.style.cursor = 'grabbing';
        };
        
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            currentX = touch.clientX;
            currentY = touch.clientY;
            
            // Empêcher le scroll vertical si on fait du swipe horizontal
            if (Math.abs(currentX - startX) > Math.abs(currentY - startY)) {
                e.preventDefault();
            }
        };
        
        const handleTouchEnd = () => {
            if (!isDragging) return;
            
            isDragging = false;
            track.style.cursor = 'grab';
            
            const diffX = startX - currentX;
            const threshold = 50; // Seuil minimum pour déclencher le swipe
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0 && currentIndex < totalCards - 1) {
                    // Swipe vers la gauche - slide suivant
                    goToSlide(currentIndex + 1);
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe vers la droite - slide précédent
                    goToSlide(currentIndex - 1);
                }
            }
        };
        
        // Ajouter les event listeners tactiles
        track.addEventListener('touchstart', handleTouchStart, { passive: false });
        track.addEventListener('touchmove', handleTouchMove, { passive: false });
        track.addEventListener('touchend', handleTouchEnd);
        
        // Support souris
        track.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            track.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            
            isDragging = false;
            track.style.cursor = 'grab';
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0 && currentIndex < totalCards - 1) {
                    goToSlide(currentIndex + 1);
                } else if (diffX < 0 && currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                }
            }
        });
        
        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < totalCards - 1) {
                goToSlide(currentIndex + 1);
            }
        });
        
        // Initialisation
        createDots();
        prevBtn.disabled = true; // Désactiver le bouton précédent au début
        
        // Auto-play optionnel (désactivé par défaut)
        let autoPlayInterval;
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < totalCards - 1) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0); // Recommencer au début
                }
            }, 6000); // 6 secondes entre chaque slide
        };
        
        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };
        
        // Arrêter l'auto-play lors de l'interaction
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay);
        
        // Optionnel : démarrer l'auto-play après 3 secondes
        // setTimeout(startAutoPlay, 3000);
    };
    
    // Initialiser le carousel après le chargement du DOM
    setTimeout(initRealisationsCarousel, 100);
    
    // ====================================
    // CTA SECTION RÉALISATIONS
    // ====================================
    
    const realisationCtaBtn = document.getElementById('realisationCtaBtn');
    if (realisationCtaBtn) {
        realisationCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });
    }
    
    // ====================================
    // BOUTONS DES CARTES CAROUSEL
    // ====================================
    
    const setupCarouselCardButtons = () => {
        // Tous les boutons "Découvrir le projet" / "Parlons-en ensemble"
        const primaryButtons = document.querySelectorAll('.card__button.primary');
        primaryButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openContactModal();
            });
        });
        
        // Tous les boutons "Notre méthode"
        const methodButtons = document.querySelectorAll('.card__button.secondary');
        methodButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Scroller vers la section méthode
                const methodSection = document.querySelector('.simple-steps-section');
                if (methodSection) {
                    methodSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Fallback vers la modal de contact
                    openContactModal();
                }
            });
        });
        
        // Gestion spéciale du bouton CTA principal
        const ctaButton = document.querySelector('.card__button.primary.cta');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                openContactModal();
            });
        }
    };
    
    // Initialiser les boutons après un délai pour s'assurer que le DOM est prêt
    setTimeout(setupCarouselCardButtons, 200);
    
    // Gestion des radio buttons de navigation
    if (navRadios.length > 0) {
        console.log('🔧 NavRadios trouvés:', navRadios.length);
        
        navRadios.forEach(radio => {
            // Événement change pour les radio buttons
            radio.addEventListener('change', function() {
                console.log('📻 Radio change détecté:', this.value, this.checked);
                if (this.checked) {
                    handleNavigation(this.value);
                }
            });
            
            // Alternative avec click sur le label parent
            const parentLabel = radio.closest('.radio');
            if (parentLabel) {
                parentLabel.addEventListener('click', function() {
                    const radioInput = this.querySelector('input');
                    if (radioInput && !radioInput.checked) {
                        console.log('🖱️ Label click détecté:', radioInput.value);
                        setTimeout(() => {
                            if (radioInput.checked) {
                                handleNavigation(radioInput.value);
                            }
                        }, 50);
                    }
                });
            }
        });
        
        function handleNavigation(sectionId) {
            console.log('🧭 Navigation vers:', sectionId);
            
            if (sectionId === 'services') {
                // Rediriger vers la page services
                console.log('🔗 Redirection vers services.html');
                window.location.href = 'services.html';
            } else {
                const targetSection = document.getElementById(sectionId);
                
                if (targetSection) {
                    console.log('📍 Scroll vers section:', sectionId);
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else if (sectionId === 'accueil') {
                    // Retour en haut pour l'accueil
                    console.log('🏠 Retour en haut');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        }
    } else {
        console.log('❌ Aucun NavRadio trouvé');
    }
      
    // Gestion de la lecture vidéo et du bouton replay
    if (heroVideo && replayBtn) {
        // Fonction pour relancer la vidéo
        const replayVideo = () => {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(err => {
                console.log('Erreur lors de la lecture de la vidéo:', err);
            });
        };

        // Event listener pour le bouton replay
        replayBtn.addEventListener('click', replayVideo);
        
        // Gestion du hover sur la vidéo pour afficher/cacher le bouton
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.addEventListener('mouseenter', () => {
                replayBtn.style.opacity = '1';
            });
            
            videoContainer.addEventListener('mouseleave', () => {
                replayBtn.style.opacity = '0.7';
            });
        }
        
        // Auto-play avec gestion des erreurs
        const playVideo = () => {
            heroVideo.play().catch(err => {
                console.log('Auto-play bloqué:', err);
                // Afficher un message discret ou un indicateur
            });
        };
        
        // Tenter l'auto-play après un court délai
        setTimeout(playVideo, 500);
    }
    
    // Gestion des boutons CTA élégante
    if (exampleBtn) {
        exampleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation douce du bouton
            this.style.transform = 'translateY(0px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Action : scroll vers la section exemple (à adapter selon votre structure)
            const exampleSection = document.querySelector('#exemple') || document.querySelector('.exemple');
            if (exampleSection) {
                exampleSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Si pas de section exemple, rediriger ou afficher un modal
                console.log('Redirection vers page exemple');
                // window.location.href = '/exemple';
            }
        });
    }
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation douce du bouton
            this.style.transform = 'translateY(0px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Action : ouvrir le calendly ou modal de contact
            openContactModal();
        });
    }
    
    // Gestion du modal de contact
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    
    function openContactModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeContactModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Event listeners pour le modal
    if (closeModal) {
        closeModal.addEventListener('click', closeContactModal);
    }
    
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });
        
        // Fermeture avec Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeContactModal();
            }
        });
    }
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de soumission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            
            submitBtn.querySelector('span').textContent = 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Simuler l'envoi (remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    closeContactModal();
                    // Reset du formulaire
                    this.reset();
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 1500);
            }, 2000);
        });
    }
    
    // Animation au scroll pour les éléments qui apparaissent
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observer les éléments animés
    const animatedElements = document.querySelectorAll('[class*="slideUp"], [class*="fadeIn"]');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    

    
    // Gestion de la qualité vidéo selon la connexion
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection && heroVideo) {
            // Ajuster la qualité vidéo selon la vitesse de connexion
            const effectiveType = connection.effectiveType;
            
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                // Connexion lente : désactiver l'autoplay
                heroVideo.autoplay = false;
                heroVideo.preload = 'metadata';
            } else if (effectiveType === '3g') {
                // Connexion moyenne : preload metadata seulement
                heroVideo.preload = 'metadata';
            }
        }
    }
    
    // Optimisation des performances - Pause vidéo quand pas visible
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === heroVideo) {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    heroVideo.pause();
                }
            }
        });
    }, { threshold: 0.25 });
    
    if (heroVideo) {
        videoObserver.observe(heroVideo);
    }
    
    // Gestion des erreurs vidéo
    if (heroVideo) {
        heroVideo.addEventListener('error', function(e) {
            console.log('Erreur de chargement vidéo:', e);
            // Afficher une image de fallback ou un message
            const videoContainer = this.parentElement;
            videoContainer.style.background = 'linear-gradient(45deg, #ffd3c1, #f3e6f9)';
            videoContainer.innerHTML += `
                <div style="position: absolute; inset: 0; display: flex; align-items: center; 
                     justify-content: center; color: #ff835f; font-size: 1.2rem; font-weight: 600;">
                    🎥 Vidéo en cours de chargement...
                </div>
            `;
        });
        
        heroVideo.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
        
        heroVideo.addEventListener('canplaythrough', function() {
            this.style.opacity = '1';
        });
    }
    
    // Performance et smooth scrolling
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Pré-charger les ressources importantes
            const preloadLinks = [
                'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap'
            ];
            
            preloadLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = href;
                link.as = 'style';
                document.head.appendChild(link);
            });
        });
    }
    
    // === GESTION DE LA NAVBAR ===
    
    // Toggle menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animation du bouton toggle
            if (navToggle.classList.contains('active')) {
                navToggle.style.transform = 'translateY(1px)';
                navToggle.style.boxShadow = `
                    2px 2px 4px rgba(255, 131, 95, 0.15),
                    -2px -2px 4px rgba(255, 255, 255, 0.5),
                    inset 6px 6px 12px rgba(255, 131, 95, 0.15),
                    inset -6px -6px 12px rgba(255, 255, 255, 0.9)`;
            } else {
                navToggle.style.transform = '';
                navToggle.style.boxShadow = '';
            }
        });
    }
    
    // Gestion du menu mobile pour les radio buttons
    navRadios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            // Fermer le menu mobile si ouvert
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.style.transform = '';
                navToggle.style.boxShadow = '';
            }
        });
    });
    
    // Bouton CTA navbar
    if (navCtaBtn) {
        navCtaBtn.addEventListener('click', function() {
            // Même action que le bouton "Discuter avec nous"
            openContactModal();
        });
    }
    
    // Fermeture menu mobile au clic outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && 
            navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.style.transform = '';
            navToggle.style.boxShadow = '';
        }
    });
    
    // Gestion du scroll pour navbar transparente
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Modification de l'opacité selon le scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(254, 249, 244, 0.95)';
            navbar.style.backdropFilter = 'blur(25px) saturate(1.2)';
        } else {
            navbar.style.background = 'var(--cream-white)';
            navbar.style.backdropFilter = 'blur(20px) saturate(1.1)';
        }
        
        // Hide/show navbar on scroll (optionnel)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up - show navbar  
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // Logo click - retour au top
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// Fonction utilitaire pour les animations fluides
function smoothTransition(element, properties, duration = 300) {
    return new Promise(resolve => {
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        Object.entries(properties).forEach(([prop, value]) => {
            element.style[prop] = value;
        });
        
        setTimeout(() => {
            element.style.transition = '';
            resolve();
        }, duration);
    });
}

// Export pour utilisation modulaire si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { smoothTransition };
}

// Animation d'écriture (Typewriter Effect) - Optimisée avec style
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.animationId = null;
    }

    start() {
        this.element.innerHTML = '';
        this.element.style.willChange = 'contents';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            const currentText = this.text.substring(0, this.index + 1);
            this.element.innerHTML = this.styleText(currentText);
            this.index++;
            this.animationId = setTimeout(() => this.type(), this.speed);
        } else {
            // Animation terminée, afficher le curseur clignotant avec délai
            this.element.style.willChange = 'auto';
            setTimeout(() => {
                const cursor = document.getElementById('cursor');
                if (cursor) {
                    cursor.style.opacity = '1';
                    cursor.classList.add('blink-animation');
                }
            }, 200);
        }
    }

    styleText(text) {
        return text
            .replace(/\bl'IA\b/gi, '<span class="word-ia">l\'IA</span>')
            .replace(/\bvous\b/gi, '<span class="word-vous">vous</span>');
    }

    stop() {
        if (this.animationId) {
            clearTimeout(this.animationId);
            this.animationId = null;
        }
    }
}

// Gestionnaire des animations séquentielles
class AnimationManager {
    constructor() {
        this.observers = [];
        this.typewriters = [];
        this.initObserver();
    }

    initObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleIntersection(entry.target);
                }
            });
        }, options);

        // Observer les sections restantes
        document.querySelectorAll('.hero-title-section, .intro-split-section').forEach(section => {
            this.observer.observe(section);
        });
    }

    handleIntersection(element) {
        if (element.classList.contains('hero-title-section')) {
            this.animateMainTitle();
        } else if (element.classList.contains('intro-split-section')) {
            this.animateIntroTexts();
        }
    }

    animateMainTitle() {
        const titleElement = document.getElementById('mainTitle');
        if (titleElement && !titleElement.classList.contains('animated')) {
            titleElement.classList.add('animated');
            const text = titleElement.getAttribute('data-text');
            const typewriter = new TypeWriter(titleElement, text, 15); // Ultra rapide : 15ms
            setTimeout(() => typewriter.start(), 100); // Délai ultra court : 100ms
        }
    }

    animateIntroTexts() {
        // Les animations sont maintenant gérées par CSS avec fadeInUp
        // Pas besoin d'animation d'écriture ici
    }

    animateConviction() {
        // Section supprimée
    }

    animateSteps() {
        // Section supprimée
    }
}

// Initialiser le gestionnaire d'animations quand le DOM est prêt
// Animation au scroll pour la section "Comment on travaille" - Version Disruptive
function initWorkingMethodAnimation() {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const progressBar = document.getElementById('methodProgressBar');
    const methodSection = document.querySelector('.working-method-section-disruptive');
    const stickyHeader = document.querySelector('.method-header-sticky');
    
    if (!timelineSteps.length || !progressBar || !methodSection || !stickyHeader) return;
    
    // Configuration de l'Intersection Observer pour les étapes
    const stepObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Ajouter la classe visible immédiatement pour plus de fluidité
                entry.target.classList.add('visible');
                // Arrêter d'observer une fois animé
                stepObserver.unobserve(entry.target);
            }
        });
    }, stepObserverOptions);
    
    // Observer chaque étape
    timelineSteps.forEach((step) => {
        stepObserver.observe(step);
    });
    
    // Gestion de la barre de progression et du header sticky
    const updateProgressAndHeader = () => {
        const sectionRect = methodSection.getBoundingClientRect();
        const sectionHeight = methodSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Vérifier si on est dans la section (plus large détection)
        const isInSection = sectionRect.top <= 120 && sectionRect.bottom >= 80;
        
        if (isInSection) {
            // Montrer le header sticky
            if (!stickyHeader.classList.contains('visible')) {
                stickyHeader.classList.add('visible');
            }
            
            // Calculer la progression (plus simple)
            let scrollPercent = 0;
            if (sectionRect.top <= 80) {
                const scrolled = Math.abs(sectionRect.top - 80);
                const totalScrollable = sectionHeight - viewportHeight;
                if (totalScrollable > 0) {
                    scrollPercent = Math.min(100, (scrolled / totalScrollable) * 100);
                }
            }
            
            // Appliquer la progression
            progressBar.style.width = `${Math.max(0, scrollPercent)}%`;
        } else {
            // Masquer le header sticky quand on n'est pas dans la section
            if (stickyHeader.classList.contains('visible')) {
                stickyHeader.classList.remove('visible');
            }
        }
    };
    
    // Écouter le scroll avec throttling pour les performances
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgressAndHeader();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialiser la barre de progression et le header
    updateProgressAndHeader();
}

// Gestionnaire pour le bouton CTA de la méthode - Version Disruptive
function initMethodCTA() {
    const methodCtaBtn = document.getElementById('methodCtaBtn');
    
    if (methodCtaBtn) {
        methodCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation du clic plus sophistiquée
            this.style.transform = 'translateY(-3px) scale(0.98)';
            this.style.boxShadow = '0 8px 25px rgba(255, 131, 95, 0.5)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Ici vous pouvez ajouter l'action souhaitée :
                // - Ouvrir une modal de contact
                // - Naviguer vers une page de démonstration
                // - Défiler vers la section contact
                console.log('Découvrir concrètement notre méthode !');
                
                // Exemple : Scroll vers le haut pour une démo ou vers un formulaire de contact
                // window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 200);
        });
        
        // Effet de particles au hover (optionnel)
        methodCtaBtn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(255, 131, 95, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)';
        });
        
        methodCtaBtn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(255, 131, 95, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)';
        });
    }
}

// ===== SECTION MÉTHODE HERO STYLE =====
function initVerticalMethod() {
    // Gérer tous les boutons CTA de la section méthode
    const ctaButtons = [
        'verticalCtaBtn1',
        'verticalCtaBtn2', 
        'verticalCtaBtn3',
        'verticalCtaBtn4'
    ];
    
    ctaButtons.forEach(buttonId => {
        const ctaBtn = document.getElementById(buttonId);
        
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Ouvrir la modal
                const contactModal = document.getElementById('contactModal');
                if (contactModal) {
                    contactModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    
    console.log('✅ Section méthode hero style initialisée !');
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser immédiatement pour une fluidité maximale
    setTimeout(() => {
        const animationManager = new AnimationManager();
        
        // Initialiser les animations de la section "Comment on travaille"
        initWorkingMethodAnimation();
        initMethodCTA();
        
        // Initialiser la section étapes simples
        if (document.querySelector('.simple-steps-section')) {
            initVerticalMethod();
        }
        
        // Initialiser la section preuves sociales
        if (document.querySelector('.social-proof-section')) {
            initSocialProofAnimations();
        }
        
        // Initialiser le carousel des témoignages
        if (document.querySelector('.testimonials-section')) {
            initTestimonialsCarousel();
        }
        
    }, 200);
});

// ====================================
// ANIMATIONS SECTION PREUVES SOCIALES
// ====================================

function initSocialProofAnimations() {
    const socialProofSection = document.querySelector('.social-proof-section');
    const proofCards = document.querySelectorAll('.proof-card');
    const transitionText = document.querySelector('.transition-text');
    
    if (!socialProofSection) return;
    
    // Configuration de l'observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
    };
    
    // Observer pour déclencher les animations
    const socialProofObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Déclencher l'animation des cartes avec des délais
                proofCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                        card.style.animationPlayState = 'running';
                    }, index * 150);
                });
                
                // Animer le texte de transition après toutes les cartes
                setTimeout(() => {
                    if (transitionText) {
                        transitionText.style.animationPlayState = 'running';
                        transitionText.classList.add('animate-in');
                    }
                }, proofCards.length * 150 + 300);
                
                // Déconnecter l'observer après l'animation
                socialProofObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer la section
    socialProofObserver.observe(socialProofSection);
    

    
    // Animation de comptage des nombres (optionnel)
    const animateNumbers = () => {
        const numbers = [
            { element: proofCards[0]?.querySelector('.proof-number'), target: 1000, prefix: '+', suffix: '' },
            { element: proofCards[1]?.querySelector('.proof-number'), target: 70, prefix: '', suffix: '%' },
            { element: proofCards[2]?.querySelector('.proof-number'), target: 100, prefix: '', suffix: '%' },
            { element: proofCards[3]?.querySelector('.proof-number'), target: 100, prefix: '', suffix: '%' }
        ];
        
        numbers.forEach((num, index) => {
            if (!num.element) return;
            
            setTimeout(() => {
                animateValue(num.element, 0, num.target, 1500, num.prefix, num.suffix);
            }, index * 150 + 400);
        });
    };
    
    // Fonction d'animation des valeurs numériques
    const animateValue = (element, start, end, duration, prefix = '', suffix = '') => {
        const startTimestamp = performance.now();
        const step = (timestamp) => {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            
            // Utiliser une fonction d'easing pour un effet plus smooth
            const easedProgress = easeOutCubic(progress);
            const current = Math.floor(start + (end - start) * easedProgress);
            
            element.textContent = prefix + current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };
    
    // Fonction d'easing
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    
    // Observer pour déclencher l'animation des nombres
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateNumbers, 800);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    numberObserver.observe(socialProofSection);
    
    console.log('✅ Animations des preuves sociales initialisées !');
}

// ====================================
// CAROUSEL TÉMOIGNAGES
// ====================================

function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dots = document.querySelectorAll('.dot');
    
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
    const testimonialSection = document.querySelector('.testimonials-section');
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
    
    console.log('✅ Carousel témoignages initialisé !');
} 