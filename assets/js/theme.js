'use strict';
// Apply the saved appearance before the stylesheet loads. Storage is optional.
try {
    const saved = localStorage.getItem('aura-theme');
    document.documentElement.dataset.theme = ['dark', 'light'].includes(saved) ? saved : 'dark';
} catch { document.documentElement.dataset.theme = 'dark'; }
