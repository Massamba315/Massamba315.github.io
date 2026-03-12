// ==================== CONFIGURATION ====================
const CONFIG = {
    pdfPaths: {
        'unchk': 'certificat/forcen-cybersecurity.pdf',
        'ccna': 'certificat/ccna-200-301.pdf',
        'ibm': 'certificat/ibm-cybersecurity.pdf',
        'microsoft': 'certificat/microsoft-cybersecurity-analyst.pdf',
        'google': 'certificat/google-play-it-safe.pdf',
        'google-pro': 'certificat/google-cybersecurity-professional.pdf',
        'datacamp': 'certificat/datacamp-deep-learning.pdf',
        'ceh': 'certificat/ceh-certified-ethical-hacker.pdf'
    }
};

// ==================== UTILITAIRES ====================
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const showNotif = msg => {
    const notif = Object.assign(document.createElement('div'), { className: 'notification', innerHTML: `<i class="fas fa-check-circle"></i><span>${msg}</span>` });
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 3000);
};

// ==================== NAVIGATION ====================
const navbar = $('.navbar');
const navLinks = $$('.nav-menu a');
const sections = $$('section');

window.addEventListener('scroll', () => {
    // Sticky navbar
    navbar.style.cssText = `background: rgba(255,255,255,${window.scrollY > 100 ? 0.98 : 0.95}); box-shadow: 0 2px 20px rgba(0,0,0,0.${window.scrollY > 100 ? 1 : 05})`;
    
    // Active links
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href').includes(current)));
});

// Smooth scroll
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const target = $(a.getAttribute('href'));
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        $('.nav-menu')?.classList.remove('active');
    }
}));

// Mobile menu
const navToggle = $('.nav-toggle');
const navMenu = $('.nav-menu');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ==================== FORMULAIRE ====================
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert(`Merci ${new FormData(contactForm).get('Nom complet') || ''} ! Message envoyé.`);
            contactForm.reset();
            btn.textContent = original;
            btn.disabled = false;
        }, 1500);
    });
}

// ==================== ANIMATIONS ====================
// Fade-in observer
const fadeObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('fade-in');
        if (e.target.classList.contains('skills-container')) {
            e.target.querySelectorAll('.progress').forEach(p => {
                const w = p.style.width;
                p.style.width = '0';
                setTimeout(() => p.style.width = w, 100);
            });
        }
    }
}), { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

$$('.section, .cert-card, .project-card, .skills-category').forEach(el => {
    Object.assign(el.style, { opacity: '0', transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' });
    fadeObserver.observe(el);
});
document.head.insertAdjacentHTML('beforeend', '<style>.fade-in{opacity:1!important;transform:translateY(0)!important}</style>');

// Typing effect
const heroSubtitle = $('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    window.addEventListener('load', function type() { if (i < text.length) heroSubtitle.textContent += text[i++]; setTimeout(type, 50); });
}

// Counter animation
const statsObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.textContent);
            if (!isNaN(target)) {
                let current = 0;
                const inc = target / 50;
                const timer = setInterval(() => {
                    current += inc;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '');
                }, 20);
            }
        });
        statsObserver.unobserve(e.target);
    }
}), { threshold: 0.5 });

const heroStats = $('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ==================== CERTIFICATS ====================
let currentCert = null;

function viewCertificate(name, id) {
    currentCert = { name, id };
    $('#modal-title').textContent = name;
    $('#certificate-name').textContent = name;
    
    const display = $('#certificate-display');
    const modal = $('#certModal');
    const footer = $('.modal-footer');
    
    display.innerHTML = '<div class="certificate-loader"><i class="fas fa-spinner fa-spin"></i><p>Chargement...</p></div>';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    const pdfPath = CONFIG.pdfPaths[id];
    const hasPDF = !!pdfPath;
    
    footer.innerHTML = hasPDF 
        ? `<button class="btn btn-primary" onclick="downloadCertificate()"><i class="fas fa-download"></i> Télécharger</button><button class="btn btn-outline" onclick="closeModal()"><i class="fas fa-times"></i> Fermer</button>`
        : `<button class="btn btn-primary" disabled style="opacity:0.5"><i class="fas fa-download"></i> Non disponible</button><button class="btn btn-outline" onclick="closeModal()"><i class="fas fa-times"></i> Fermer</button>`;
    
    setTimeout(() => {
        display.innerHTML = hasPDF
            ? `<div class="pdf-container"><iframe src="${pdfPath}" class="pdf-viewer" frameborder="0" title="${name}"></iframe></div>`
            : `<div class="certificate-placeholder"><i class="fas fa-exclamation-triangle" style="color:#f39c12;"></i><p>${name}</p><p style="color:var(--gray);">Non disponible</p><small>Contactez-moi</small></div>`;
    }, 500);
}

function closeModal() {
    $('#certModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    $('#certificate-display').innerHTML = '<div class="certificate-placeholder"><i class="fas fa-certificate"></i><p id="certificate-name">Certificat</p></div>';
    $('.modal-footer').innerHTML = `<button class="btn btn-primary" onclick="downloadCertificate()"><i class="fas fa-download"></i> Télécharger</button><button class="btn btn-outline" onclick="closeModal()"><i class="fas fa-times"></i> Fermer</button>`;
    currentCert = null;
}

function downloadCertificate() {
    if (!currentCert) return;
    const path = CONFIG.pdfPaths[currentCert.id];
    if (path) {
        const link = Object.assign(document.createElement('a'), { href: path, download: `${currentCert.name}.pdf` });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotif(`Téléchargement de "${currentCert.name}" démarré`);
    } else alert('Certificat non disponible');
}

// Modal events
window.onclick = e => { if (e.target == $('#certModal')) closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
