const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const memberDialog = document.querySelector('[data-member-dialog]');
const productDialog = document.querySelector('[data-product-dialog]');

const toggleMenu = (open) => {
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
};

document.querySelector('[data-menu-open]').addEventListener('click', () => toggleMenu(true));
document.querySelector('[data-menu-close]').addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('[data-menu-link]').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) toggleMenu(false);
});

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 80);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-member-open]').forEach(button => {
  button.addEventListener('click', () => memberDialog.showModal());
});
document.querySelectorAll('[data-member-close]').forEach(button => {
  button.addEventListener('click', () => memberDialog.close());
});

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    productDialog.querySelector('[data-product-name]').textContent = button.dataset.product;
    productDialog.showModal();
  });
});
document.querySelector('[data-product-close]').addEventListener('click', () => productDialog.close());

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelector('[data-newsletter]').addEventListener('submit', event => {
  event.preventDefault();
  const note = document.querySelector('[data-form-note]');
  note.textContent = 'Welcome to Saint Riviera.';
  event.currentTarget.reset();
});
