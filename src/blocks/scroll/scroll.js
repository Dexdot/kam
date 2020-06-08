import LocomotiveScroll from 'locomotive-scroll';

document.addEventListener('DOMContentLoaded', () => {
  // Init
  initLocoScroll();
});
window.addEventListener('load', updateScroll);

function initLocoScroll() {
  const scrollContainer = $.qs('#js-scroll');
  if (!scrollContainer) return false;

  // Scrollbar show/hide
  const scrollbar = {
    show: () => {
      if (loco.scroll.scrollbar)
        loco.scroll.scrollbar.classList.remove('u-hidden');
    },
    hide: () => {
      if (loco.scroll.scrollbar)
        loco.scroll.scrollbar.classList.add('u-hidden');
    }
  };

  // Scroll instance
  const loco = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    getDirection: true
  });

  window.loco = loco;

  // Scroll data, start/stop functions
  window.scroll = {
    data: {
      direction: 'down'
    },
    start: () => {
      document.addEventListener('keydown', loco.scroll.checkKey, false);
      scrollbar.show();
      loco.start();
    },
    stop: () => {
      document.removeEventListener('keydown', loco.scroll.checkKey, false);
      scrollbar.hide();
      loco.stop();
    }
  };

  // Save scroll data
  loco.on('scroll', e => {
    window.scroll.data = e;
  });

  scrollContainer.dispatchEvent(new Event('locoscroll:init'));
}

function updateScroll() {
  const { loco } = window;
  if (loco && loco.update) loco.update();
}
