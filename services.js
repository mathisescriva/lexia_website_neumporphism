// Script pour la page Services - Lexia
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Navigation - mettre "Services" en actif
    const navRadios = document.querySelectorAll('.radio-inputs .radio input');
    navRadios.forEach(radio => {
        if (radio.value === 'services') {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function() {
            if (this.checked) {
                const sectionId = this.value;
                
                if (sectionId === 'accueil') {
                    window.location.href = 'index.html';
                } else if (sectionId === 'services') {
                    // Rester sur cette page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // Rediriger vers la page principale avec l'ancre
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
                entry.target.classList.add('visible');
                
                // Animation spéciale pour les cartes de services
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .transition-visual, .conclusion-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // ====================================
    // BOUTONS CTA DES SERVICES
    // ====================================
    
    function openContactModal(serviceType = '') {
        const contactModal = document.getElementById('contactModal');
        if (contactModal) {
            // Pré-remplir le select si un service est spécifié
            if (serviceType) {
                const serviceSelect = contactModal.querySelector('select');
                if (serviceSelect) {
                    serviceSelect.value = serviceType.toLowerCase();
                }
            }
            
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Boutons des cartes de services
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation du clic
            this.style.transform = 'translateY(-1px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Détecter quel service
            const serviceCard = this.closest('.service-card');
            const serviceType = serviceCard ? serviceCard.getAttribute('data-service') : '';
            
            openContactModal(serviceType);
        });
    });
    
    // Bouton CTA final
    const finalCtaBtn = document.getElementById('finalCtaBtn');
    if (finalCtaBtn) {
        finalCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal('custom');
        });
    }
    

    
    // ====================================
    // ANIMATIONS DES BLOCS DE TRANSITION
    // ====================================
    
    const initGeminiEffect = () => {
        const paths = document.querySelectorAll('.gemini-path');
        const connectionPoints = document.querySelectorAll('.connection-point');
        const particles = document.querySelectorAll('.flow-particle');
        const geminiSection = document.querySelector('.gemini-section');
        
        if (!geminiSection) return;
        
        // Observer pour déclencher les animations au scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };

        const geminiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🌟 Gemini effect triggered');
                    
                    // Réactiver les animations des paths
                    paths.forEach((path, index) => {
                        path.style.animationPlayState = 'running';
                        setTimeout(() => {
                            path.classList.add('active');
                        }, index * 500);
                    });
                    
                    // Animer les points de connexion
                    connectionPoints.forEach((point, index) => {
                        setTimeout(() => {
                            point.style.opacity = '1';
                            point.style.transform = 'scale(1)';
                        }, index * 200 + 500);
                    });
                    
                    // Déclencher les particules avec délai
                    setTimeout(() => {
                        particles.forEach(particle => {
                            particle.style.animationPlayState = 'running';
                        });
                    }, 2000);
                    
                    // Déconnecter après la première activation
                    geminiObserver.disconnect();
                }
            });
        }, observerOptions);

        // Initialiser les états
        paths.forEach(path => {
            path.style.animationPlayState = 'paused';
        });
        
        connectionPoints.forEach(point => {
            point.style.opacity = '0';
            point.style.transform = 'scale(0)';
            point.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });

        // Interactions hover sur les points de connexion
        connectionPoints.forEach(point => {
            point.addEventListener('mouseenter', function() {
                if (this.style.opacity === '1') {
                    this.style.transform = 'scale(1.4)';
                    this.style.filter = 'drop-shadow(0 0 25px currentColor)';
                }
            });
            
            point.addEventListener('mouseleave', function() {
                if (this.style.opacity === '1') {
                    this.style.transform = 'scale(1)';
                    this.style.filter = 'drop-shadow(0 0 8px currentColor)';
                }
            });
            
            // Effet de pulse au clic
            point.addEventListener('click', function() {
                this.style.animation = 'pulse 0.3s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });

        // Observer la section
        geminiObserver.observe(geminiSection);
        
        // Réactivation au scroll si nécessaire
        let isActivated = false;
        window.addEventListener('scroll', () => {
            if (!isActivated) {
                const rect = geminiSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    isActivated = true;
                }
            }
        });
    };
    
    // Initialiser l'effet Gemini avec un délai pour s'assurer que le DOM est prêt
    setTimeout(initGeminiEffect, 500);

    // ====================================
    // SECTION SERVICES - STYLE MÉTHODE
    // ====================================

    const initServicesSection = () => {
        const serviceItems = document.querySelectorAll('.service-item');
        const serviceButtons = document.querySelectorAll('.service-button');

        // Ajouter des interactions sobres aux services
        serviceItems.forEach((service, index) => {
            // Animation d'entrée séquentielle
            service.style.animationDelay = `${0.2 + index * 0.2}s`;

            // Gestion des clics sur les boutons CTA
            const ctaButton = service.querySelector('.service-button');
            if (ctaButton) {
                ctaButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const serviceType = this.getAttribute('data-service');
                    const serviceName = service.querySelector('.service-name').textContent.split(' — ')[0];
                    
                    console.log('🚀 Service demandé:', serviceType, '-', serviceName);
                    
                    // Effet visuel sobre au clic
                    this.style.transform = 'translateY(-1px) scale(0.98)';
                    
                    setTimeout(() => {
                        this.style.transform = 'translateY(-2px) scale(1.02)';
                    }, 150);
                    
                    // Animation de la flèche
                    const arrow = this.querySelector('svg');
                    if (arrow) {
                        arrow.style.transform = 'translateX(5px)';
                        setTimeout(() => {
                            arrow.style.transform = 'translateX(2px)';
                        }, 300);
                    }
                    
                    // Ouvrir le modal avec le contexte du service
                    if (typeof openContactModal === 'function') {
                        openContactModal(serviceType);
                    } else {
                        console.warn('openContactModal function not found');
                        // Fallback - scroll vers une section de contact
                        const contactSection = document.querySelector('#contact, .contact, .closing-author');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            }

            // Interactions hover subtiles sur les benefit items
            const benefitItems = service.querySelectorAll('.benefit-item');
            benefitItems.forEach(benefit => {
                benefit.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(3px)';
                });
                
                benefit.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        });

        // Observer pour déclencher les animations au scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };

        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('📋 Service visible:', entry.target.querySelector('.service-name')?.textContent || 'Service');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        serviceItems.forEach(service => {
            servicesObserver.observe(service);
        });
    };

    // Initialiser les services
    setTimeout(initServicesSection, 400);

    // ====================================
    // SECTION HERO AVEC IMAGE
    // ====================================

    const initHeroImageEffects = () => {
        const heroImage = document.querySelector('.hero-image-container');
        
        if (!heroImage) return;

        // Animation subtile au scroll (gardée mais désactivée pour simplifier)
        // Les effets hover ont été supprimés selon la demande utilisateur
    };

    // Initialiser les effets image hero
    setTimeout(initHeroImageEffects, 300);
    
    // ====================================
    // GESTION DU FORMULAIRE MODAL
    // ====================================
    
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
            
            // Simuler l'envoi
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    // Fermer la modal
                    const contactModal = document.getElementById('contactModal');
                    if (contactModal) {
                        contactModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    
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
    
    // ====================================
    // INTERACTIONS AVANCÉES DES CARTES
    // ====================================
    
    const initServiceCardInteractions = () => {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Effet de parallaxe subtil sur les icônes
            card.addEventListener('mousemove', function(e) {
                const icon = this.querySelector('.service-icon');
                if (!icon) return;
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                icon.style.transform = `perspective(100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
            
            // Animation des bénéfices au hover de la carte
            card.addEventListener('mouseenter', function() {
                const benefitItems = this.querySelectorAll('.benefit-item');
                benefitItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(5px)';
                        item.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 131, 95, 0.08))';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const benefitItems = this.querySelectorAll('.benefit-item');
                benefitItems.forEach(item => {
                    item.style.transform = '';
                    item.style.background = '';
                });
            });
        });
    };
    
    // Initialiser les interactions après un délai
    setTimeout(initServiceCardInteractions, 1000);
    
    // ====================================
    // PERFORMANCE ET OPTIMISATIONS
    // ====================================
    
    // Lazy loading pour les animations
    if ('IntersectionObserver' in window) {
        const lazyAnimations = document.querySelectorAll('[data-animation]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.animation;
                    entry.target.classList.add(`animate-${animationType}`);
                    lazyObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyAnimations.forEach(el => lazyObserver.observe(el));
    }
    
    // Optimisation des performances pour les animations
    let isAnimating = false;
    let animationFrame;
    
    const optimizedAnimate = (callback) => {
        if (!isAnimating) {
            isAnimating = true;
            animationFrame = requestAnimationFrame(() => {
                callback();
                isAnimating = false;
            });
        }
    };
    
    // Smooth scrolling optimisé
    const smoothScrollTo = (target, duration = 1000) => {
        const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, startPosition + distance * easeInOutQuart(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    };
    
    // ====================================
    // GESTIONNAIRE D'ERREURS ET FALLBACKS
    // ====================================
    
    window.addEventListener('error', function(e) {
        console.log('Erreur capturée:', e.error);
        
        // Fallback pour les animations qui échouent
        const failedElements = document.querySelectorAll('[style*="opacity: 0"]');
        failedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    
    // Support des anciens navigateurs
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            return setTimeout(callback, 16);
        };
    }
    
    // ====================================
    // INITIALISATION FINALE
    // ====================================
    
    console.log('🎯 Page Services Lexia initialisée avec succès !');
    
    // Indicateur de chargement terminé
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
});

// ====================================
// FONCTIONS UTILITAIRES EXPORTÉES
// ====================================

// Fonction pour ouvrir la modal depuis d'autres scripts
window.openServicesModal = function(serviceType = '') {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        if (serviceType) {
            const serviceSelect = contactModal.querySelector('select');
            if (serviceSelect) {
                serviceSelect.value = serviceType.toLowerCase();
            }
        }
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// Fonction pour scroller vers une section spécifique
window.scrollToService = function(serviceName) {
    const serviceCard = document.querySelector(`[data-service="${serviceName}"]`);
    if (serviceCard) {
        serviceCard.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Effet de mise en évidence
        serviceCard.style.transform = 'scale(1.02)';
        serviceCard.style.boxShadow = '0 20px 60px rgba(255, 131, 95, 0.2)';
        
        setTimeout(() => {
            serviceCard.style.transform = '';
            serviceCard.style.boxShadow = '';
        }, 2000);
    }
};

// Export pour utilisation modulaire si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openServicesModal: window.openServicesModal,
        scrollToService: window.scrollToService
    };
} 