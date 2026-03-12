// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Validation simple
    if (name && email && message) {
        // Ici vous pourriez envoyer les données à un serveur
        // Pour l'exemple, on affiche juste un message
        alert('Merci ' + name + ' ! Votre message a été envoyé avec succès.');
        this.reset(); // Réinitialiser le formulaire
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Animation au scroll pour les éléments
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Appliquer l'animation aux cartes
document.querySelectorAll('.cert-card, .project-card, .skill-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Navigation responsive (toggle menu)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav-menu');
        const logo = document.querySelector('.logo');
        
        // Créer un bouton hamburger
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;
        
        // Ajouter le bouton à la navigation
        document.querySelector('.nav-container').appendChild(hamburger);
        
        // Gérer le clic sur le hamburger
        hamburger.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '60px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = '#0a3d62';
            nav.style.padding = '1rem';
        });
    }
};

// Appeler la fonction après le chargement de la page
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').style.display = 'flex';
    }
});
