/**
 * animations.js
 * Gère les animations d'apparition au scroll (Scroll Reveal) et les effets de l'interface.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FONCTIONNALITÉ SCROLL REVEAL (Conservée et Optimisée) ---

    const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-text, .reveal-element');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe 'revealed' pour appliquer la transition CSS
                entry.target.classList.add('revealed');
                
                // Cesser d'observer l'élément une fois qu'il a été révélé
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, 
        rootMargin: '0px 0px -15% 0px', // Déclencher l'animation légèrement plus tôt (15% avant le bas de l'écran)
        threshold: 0.05 // Déclencher l'animation dès que 5% de l'élément est visible
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });


    // --- 2. EFFET DE HEADER "SHRINK" (Le JS de malade !) ---
    // Change l'apparence de l'en-tête lorsque l'utilisateur scroll au-delà d'un seuil.

    const header = document.querySelector('.header-fixed');
    const scrollThreshold = 50; // Seuil en pixels pour déclencher l'effet

    function updateHeaderOnScroll() {
        if (!header) return; // Sécurité au cas où l'élément n'existe pas

        if (window.scrollY >= scrollThreshold) {
            // L'utilisateur a assez scrollé, on ajoute la classe 'scrolled'
            header.classList.add('scrolled');
        } else {
            // On est revenu au sommet, on retire la classe
            header.classList.remove('scrolled');
        }
    }

    // Écoute de l'événement scroll, en utilisant un petit 'debounce' 
    // (setTimeout) pour ne pas surcharger le navigateur à chaque pixel de défilement.
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateHeaderOnScroll, 10); // Mise à jour très fréquente (10ms)
    }, false);


    // --- 3. AMÉLIORATION UX ---
    document.documentElement.style.scrollBehavior = 'smooth';
});