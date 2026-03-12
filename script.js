// Navigation sticky et active links
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Sticky navbar effect
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }

    // Active navigation links
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate toggle icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            alert(`Merci ${data['Nom complet'] || ''} ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.`);
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate progress bars
            if (entry.target.classList.contains('skills-container')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .cert-card, .project-card, .skills-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add fade-in class for animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Typing effect for hero subtitle (optional)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after page load
    window.addEventListener('load', typeWriter);
}

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 20);
};

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Dark mode toggle (optional)
const createDarkModeToggle = () => {
    const toggle = document.createElement('div');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        box-shadow: var(--shadow);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
};

// Gestionnaire de visualisation des certificats
let currentCertificate = null;

function viewCertificate(certName, certId) {
    currentCertificate = { name: certName, id: certId };
    
    // Mettre à jour le titre du modal
    document.getElementById('modal-title').textContent = certName;
    document.getElementById('certificate-name').textContent = certName;
    
    // Récupérer l'élément d'affichage
    const display = document.getElementById('certificate-display');
    
    // Configuration des chemins PDF
    const certificatePDFs = {
        'unchk': 'certificat/forcen-cybersecurity.pdf',
        'ccna': 'certificat/ccna-200-301.pdf',
        'ibm': 'certificat/ibm-cybersecurity.pdf',
        'microsoft': 'certificat/microsoft-cybersecurity-analyst.pdf',
        'google': 'certificat/google-play-it-safe.pdf',
        'google-pro': 'certificat/google-cybersecurity-professional.pdf',
        'datacamp': 'certificat/datacamp-deep-learning.pdf',
        'ceh': 'certificat/ceh-certified-ethical-hacker.pdf'
    };
    
    // Afficher un loader pendant le chargement
    display.innerHTML = `
        <div class="certificate-loader">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Chargement du certificat PDF...</p>
        </div>
    `;
    
    // Afficher le modal immédiatement
    const modal = document.getElementById('certModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Réinitialiser le footer avec les bons boutons
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn btn-primary" onclick="downloadCertificate()">
                <i class="fas fa-download"></i> Télécharger le PDF
            </button>
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        `;
    }
    
    // Vérifier si le PDF existe
    if (certificatePDFs[certId]) {
        const pdfPath = certificatePDFs[certId];
        
        // Créer le viewer PDF (sans les boutons de contrôle supplémentaires)
        setTimeout(() => {
            display.innerHTML = `
                <div class="pdf-container">
                    <iframe 
                        src="${pdfPath}" 
                        class="pdf-viewer" 
                        frameborder="0"
                        title="${certName}"
                    ></iframe>
                </div>
            `;
        }, 500);
    } else {
        // Afficher un message si le PDF n'est pas trouvé
        setTimeout(() => {
            display.innerHTML = `
                <div class="certificate-placeholder">
                    <i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i>
                    <p>${certName}</p>
                    <p style="color: var(--gray); font-size: 0.9rem;">Certificat non disponible pour le moment</p>
                    <small>Veuillez me contacter pour obtenir une copie</small>
                </div>
            `;
            
            // Désactiver le bouton de téléchargement dans le footer
            if (modalFooter) {
                modalFooter.innerHTML = `
                    <button class="btn btn-primary" onclick="downloadCertificate()" disabled style="opacity: 0.5; cursor: not-allowed;">
                        <i class="fas fa-download"></i> Non disponible
                    </button>
                    <button class="btn btn-outline" onclick="closeModal()">
                        <i class="fas fa-times"></i> Fermer
                    </button>
                `;
            }
        }, 500);
    }
}

function closeModal() {
    const modal = document.getElementById('certModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Nettoyer l'affichage
    const display = document.getElementById('certificate-display');
    display.innerHTML = `
        <div class="certificate-placeholder">
            <i class="fas fa-certificate"></i>
            <p id="certificate-name">Certificat</p>
        </div>
    `;
    
    // Réinitialiser le footer
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn btn-primary" onclick="downloadCertificate()">
                <i class="fas fa-download"></i> Télécharger le PDF
            </button>
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        `;
    }
    
    currentCertificate = null;
}

function downloadCertificate() {
    if (!currentCertificate) return;
    
    const certificatePDFs = {
        'unchk': 'certificat/forcen-cybersecurity.pdf',
        'ccna': 'certificat/ccna-200-301.pdf',
        'ibm': 'certificat/ibm-cybersecurity.pdf',
        'microsoft': 'certificat/microsoft-cybersecurity-analyst.pdf',
        'google': 'certificat/google-play-it-safe.pdf',
        'google-pro': 'certificat/google-cybersecurity-professional.pdf',
        'datacamp': 'certificat/datacamp-deep-learning.pdf',
        'ceh': 'certificat/ceh-certified-ethical-hacker.pdf'
    };
    
    const pdfPath = certificatePDFs[currentCertificate.id];
    
    if (pdfPath) {
        // Créer un lien de téléchargement
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = `${currentCertificate.name}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Afficher une notification
        showNotification(`Téléchargement de "${currentCertificate.name}" démarré`);
    } else {
        alert('Désolé, ce certificat n\'est pas disponible au téléchargement pour le moment.');
    }
}

// Fonction pour afficher une notification
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Fermer le modal si on clique en dehors
window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Fermer le modal avec la touche Echap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
