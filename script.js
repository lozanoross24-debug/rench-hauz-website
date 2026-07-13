const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');
const bookingForm = document.getElementById('booking-form');
const toast = document.querySelector('.toast');
const quoteService = document.getElementById('quote-service');
const vehicleType = document.getElementById('vehicle-type');
const quoteTotal = document.getElementById('quote-total');
const quoteNote = document.getElementById('quote-note');

const prices = {
  oil: { sedan: 2500, suv: 3800, pickup: 4500, label: '₱' },
  undercoating: { sedan: 4000, suv: 5500, pickup: 6500, label: '₱' },
  brakes: { sedan: 800, suv: 1200, pickup: 1200, label: '₱' },
  diagnostic: { sedan: 1200, suv: 1500, pickup: 1500, label: '₱' }
};

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });

  document.querySelectorAll('header nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function updateQuote() {
  if (!quoteService || !vehicleType || !quoteTotal) return;
  const service = quoteService.value;
  const vehicle = vehicleType.value;

  if (!service || !vehicle) {
    quoteTotal.textContent = 'Select your service';
    quoteNote.textContent = 'Final costs may vary based on exact parts and vehicle configuration.';
    return;
  }

  const quote = prices[service]?.[vehicle];
  if (!quote) {
    quoteTotal.textContent = 'Select your service';
    return;
  }

  quoteTotal.textContent = `${prices[service].label}${quote.toLocaleString()}+`;
}

quoteService?.addEventListener('change', updateQuote);
vehicleType?.addEventListener('change', updateQuote);
updateQuote();

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
});

revealElements.forEach((el, index) => {
  if (el.classList.contains('reveal-stagger')) {
    el.querySelectorAll(':scope > *').forEach((child, childIndex) => {
      child.style.setProperty('--reveal-index', childIndex);
    });
  } else {
    el.style.setProperty('--reveal-index', index);
  }
  revealObserver.observe(el);
});

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!toast) return;
  toast.textContent = 'Thanks! Your request has been registered.';
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 4000);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 32) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});
