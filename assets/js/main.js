'use strict';
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initInquiry();
});
function initTheme() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const update = () => {
        const dark = document.documentElement.dataset.theme !== 'light';
        button.setAttribute('aria-label', dark ? 'Switch to light appearance' : 'Switch to dark appearance');
        button.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    };
    update();
    button.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('aura-theme', theme); } catch { /* Continue without saving. */ }
        update();
    });
    button.hidden = false;
}
function initNavigation() {
    const header = document.querySelector('.smart-nav');
    const menu = document.getElementById('main-navigation');
    const button = document.getElementById('menu-toggle');
    if (!header || !menu || !button) return;
    const mobile = window.matchMedia('(max-width: 720px)');
    let open = false;
    const render = () => {
        menu.hidden = mobile.matches && !open;
        button.hidden = !mobile.matches;
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? 'Close' : 'Menu';
    };
    const close = restoreFocus => {
        open = false;
        if (restoreFocus) button.focus();
        render();
    };
    header.classList.add('navigation-ready');
    button.addEventListener('click', () => { open = !open; render(); });
    header.addEventListener('keydown', event => {
        if (event.key === 'Escape' && open) { event.preventDefault(); close(true); }
    });
    document.addEventListener('click', event => { if (open && !header.contains(event.target)) close(menu.contains(document.activeElement)); });
    header.addEventListener('focusout', event => {
        if (open && event.relatedTarget && !header.contains(event.relatedTarget)) close(false);
    });
    menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
        const section = document.getElementById(link.hash.slice(1));
        if (!section) return;
        close(false);
        section.focus({ preventScroll: true });
    }));
    const resize = () => {
        const active = document.activeElement;
        open = false;
        render();
        if (mobile.matches && menu.contains(active)) button.focus();
        else if (!mobile.matches && active === button) menu.querySelector('a')?.focus();
    };
    if (mobile.addEventListener) mobile.addEventListener('change', resize);
    else mobile.addListener(resize);
    render();
}
function initInquiry() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;
    const result = document.getElementById('inquiry-result');
    const draft = document.getElementById('inquiry-draft');
    const email = document.getElementById('inquiry-email');
    const status = document.getElementById('inquiry-status');
    form.addEventListener('input', () => {
        result.hidden = true;
        draft.value = '';
        email.removeAttribute('href');
        status.textContent = '';
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const body = `Name: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\nProject: ${String(data.get('project')).trim()}\n\n${String(data.get('message')).trim()}`;
        draft.value = body;
        email.href = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent('AURA project inquiry')}&body=${encodeURIComponent(body)}`;
        result.hidden = false;
        status.textContent = 'Draft prepared on your device. Nothing has been sent. Open your email app or copy the draft below.';
        draft.focus();
    });
    document.getElementById('inquiry-prepare').disabled = false;
}
