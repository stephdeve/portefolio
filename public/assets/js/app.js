// Theme toggle
(function() {
  const toggle = document.getElementById('themeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');
  
  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Update icons
    if (iconSun && iconMoon) {
      if (theme === 'dark') {
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
      } else {
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
      }
    }
  }
  
  function getCurrentTheme() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  
  function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  }
  
  // Initialize theme on load regardless of toggle presence
  applyTheme(getCurrentTheme());
  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }
})();

// Mobile menu
(function(){
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('hidden'));
})();

// Reveal on scroll + animate progress bars
(function(){
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const bars = Array.from(document.querySelectorAll('.progress[data-level]'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0','translate-y-4');
        entry.target.classList.add('opacity-100','translate-y-0');
        if (entry.target.classList.contains('progress')) {
          const level = entry.target.getAttribute('data-level');
          if (level) entry.target.style.width = level + '%';
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => obs.observe(el));
  bars.forEach(el => obs.observe(el));
})();

// Contact form validation
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const fields = ['name','email','message'];
  function setError(name, message) {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = message || '';
  }
  function validate() {
    let valid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    setError('name',''); setError('email',''); setError('message','');

    if (name.length < 2) { setError('name','Nom invalide.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email','Email invalide.'); valid = false; }
    if (message.length < 10) { setError('message','Message trop court.'); valid = false; }

    return valid;
  }

  form.addEventListener('submit', function(e){
    if (!validate()) {
      e.preventDefault();
    }
  });
})();
