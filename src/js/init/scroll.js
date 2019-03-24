import Scroll from '../components/scroll';

window.addEventListener('DOMContentLoaded', () => {
  $('.js-scroll').each((i, el) => {
    new Scroll(el);
  });
});
