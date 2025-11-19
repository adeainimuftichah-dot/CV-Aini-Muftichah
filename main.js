// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 500);
  }
});

// Mobile Sidebar Toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
}

// Close mobile sidebar when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mobileToggle.classList.remove('active');
  });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section, .hero');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Animate skill bars on scroll
const skillsSection = document.querySelector('.skills-section');
let skillsAnimated = false;

const animateSkills = () => {
  if (!skillsSection || skillsAnimated) return;
  
  const sectionTop = skillsSection.offsetTop;
  const sectionHeight = skillsSection.clientHeight;
  const scrollPos = window.scrollY + window.innerHeight;
  
  if (scrollPos > sectionTop + (sectionHeight / 2)) {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    skillsAnimated = true;
  }
};

window.addEventListener('scroll', animateSkills);

// Simple fade-in animation on scroll
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Portfolio image lightbox (simple version)
const portfolioItems = document.querySelectorAll('.portfolio-item img');
portfolioItems.forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = img.src;
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', () => {
      lightbox.remove();
    });
  });
});
