const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (navigation) {
      navigation.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', navigation.classList.contains('open'));
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navigation) {
      navigation.classList.remove('open');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (!sections.length) return;
  let currentSectionId = sections[0].id;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.35 && rect.bottom > window.innerHeight * 0.35) {
      currentSectionId = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
  });
});

window.dispatchEvent(new Event('scroll'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, {
    threshold: 0.6
  });

  sections.forEach(section => observer.observe(section));
}
