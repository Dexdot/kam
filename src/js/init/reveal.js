import Reveal from '../components/reveal';

window.addEventListener('DOMContentLoaded', () => {
  $('.js-reveal').each((i, el) => {
    new Reveal(el);
  });
});
