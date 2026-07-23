==========================================================================
AURA — HIGH-END INTERIOR ARCHITECTURE & DESIGN WEB TEMPLATE
==========================================================================
Thank you for purchasing AURA. This premium single-page HTML5 template 
is engineered for elite interior designers and architects.

--------------------------------------------------------------------------
1. PROJECT STRUCTURE & COMPILATION
--------------------------------------------------------------------------
The project uses a professional modular Sass (SCSS) architecture. 
- index.html        : Core semantic HTML5 structure.
- scss/main.css     : Production-ready compiled stylesheet.
- scss/main.scss    : Central compiler file.
- assets/js/main.js : Interaction motor for navigation and theme switching.

To modify styles, open the root folder in your compiler (e.g., Live Sass 
Compiler) and watch 'scss/main.scss'. It will automatically overwrite 
'scss/main.css'.

--------------------------------------------------------------------------
2. IMAGERY & TEXT CUSTOMIZATION
--------------------------------------------------------------------------
The default template utilizes high-resolution architectural photography 
hosted via secure CDNs. To implement your personal portfolio assets:

1. Locate the imagery sections in 'index.html' (marked within the 
   '.portfolio-grid' and '.hero-visual' classes).
2. Replace the external URL in the 'src' attribute with your local path.
   
   Example (External CDN to Local Asset):
   Change:  src="https://images.unsplash.com/..."
   To:      src="scss/components/your-image.jpg" 
   (Or any preferred local directory asset).

--------------------------------------------------------------------------
3. THEME MANAGEMENT (DARK / LIGHT MODES)
--------------------------------------------------------------------------
Global colors are controlled dynamically via native CSS custom properties 
located in 'scss/_variable.scss':

- ':root'                : Default Dark Mode color variables.
- '[data-theme="light"]' : Default Light Mode color variables.

Modifying these variables updates the entire interface seamlessly.
==========================================================================