/**
 * AURA INTERACTIVE MOTOR — CORE UX & RENDERING LOGIC
 * Código nativo optimizado para animaciones fluidas y control de estado de UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmartNavigation();
    initParallaxVisuals();
    initThemeToggle();
});

/**
 * Control inteligente de la barra de navegación flotante.
 * Detecta la dirección del scroll para optimizar el espacio visual en pantalla.
 */
function initSmartNavigation() {
    const navBar = document.querySelector('.smart-nav');
    if (!navBar) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 10; // Pixels mínimos para activar el cambio de estado

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Evita lecturas erróneas en rebotes de scroll superiores (especialmente en iOS/iPadOS)
        if (currentScrollY < 0) return;

        // Si la diferencia de scroll es menor al umbral, se ignora la operación
        if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
            return;
        }

        // Determina la dirección del desplazamiento
        if (currentScrollY > lastScrollY && currentScrollY > 120) {
            // El usuario baja: se oculta la barra para priorizar la fotografía
            navBar.classList.add('nav-hidden');
        } else {
            // El usuario sube: la píldora translúcida reaparece suavemente
            navBar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true }); // Atributo passive para optimizar el rendimiento de scroll
}

/**
 * Inicialización y control del conmutador de temas (Dark / Light).
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (currentTheme === 'dark' || !currentTheme) {
            newTheme = 'light';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('aura-theme', newTheme);
    });

    // Carga del tema guardado previamente en la sesión del usuario
    const savedTheme = localStorage.getItem('aura-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Asegúrate de mandar llamar esta función dentro del DOMContentLoaded existente en tu main.js:
// initThemeToggle();

/**
 * Micro-interacción de paralaje sutil para los contenedores de imágenes premium.
 * Añade profundidad tridimensional al interactuar con el scroll.
 */
function initParallaxVisuals() {
    const images = document.querySelectorAll('.parallax-img');
    
    // Verificación de capacidades de hardware antes de aplicar efectos
    if ('IntersectionObserver' in window && window.requestAnimationFrame) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', scrollHandler);
                } else {
                    window.removeEventListener('scroll', scrollHandler);
                }
            });
        }, { threshold: 0.1 });

        images.forEach(img => imageObserver.observe(img));

        function scrollHandler() {
            window.requestAnimationFrame(() => {
                images.forEach(img => {
                    const rect = img.getBoundingClientRect();
                    const viewHeight = window.innerHeight;
                    
                    // Si el elemento está visible en el viewport
                    if (rect.top < viewHeight && rect.bottom > 0) {
                        // Calcula el desplazamiento relativo
                        const scrollPercentage = (rect.top / viewHeight) * 100;
                        // Aplica un sutil desplazamiento inverso del 5% máximo
                        img.style.transform = `scale(1.05) translateY(${(scrollPercentage - 50) * 0.1}%)`;
                    }
                });
            });
        }
    }
}