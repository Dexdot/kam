import anime from 'animejs';
import { getMousePosition } from '../helpers/mouse';

export default class Reveal {
  constructor(el) {
    this.DOM = {
      el
    };

    this.DOM.reveal = document.createElement('div');
    this.DOM.reveal.className = 'reveal';
    this.DOM.reveal.style.overflow = 'hidden';

    this.DOM.reveal.innerHTML = `<div class="reveal__inner"><div class="reveal__img u-bg" style="background-image:url(${
      this.DOM.el.dataset.img
    })"></div></div>`;
    this.DOM.el.appendChild(this.DOM.reveal);

    this.DOM.revealInner = this.DOM.reveal.querySelector('.reveal__inner');
    this.DOM.revealInner.style.overflow = 'hidden';
    this.DOM.revealImg = this.DOM.revealInner.querySelector('.reveal__img');

    this.options = {
      easing: 'cubicBezier(.09,.78,.22,.99)'
    };

    this.initEvents();
  }

  initEvents() {
    this.positionElement = ev => {
      const mousePos = getMousePosition(ev);
      const docScrolls = {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop
      };

      const bodyScrollY = window.lerpedScrollY || 0;

      this.DOM.reveal.style.top = `${mousePos.y +
        20 +
        bodyScrollY -
        docScrolls.top}px`;
      this.DOM.reveal.style.left = `${mousePos.x + 20 - docScrolls.left}px`;
    };

    this.mouseenterFn = ev => {
      this.positionElement(ev);
      this.showImage();
    };

    this.mousemoveFn = ev =>
      requestAnimationFrame(() => {
        this.positionElement(ev);
      });

    this.mouseleaveFn = () => {
      this.hideImage();
    };

    this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
    this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
    this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
  }

  showImage() {
    anime.remove(this.DOM.revealInner);
    anime.remove(this.DOM.revealImg);

    anime({
      begin: () => {
        this.DOM.reveal.style.opacity = 1;
        anime.set(this.DOM.el, { zIndex: 1000 });
      },
      ...this.options,
      targets: this.DOM.revealInner,
      duration: 400,
      translateX: ['50%', '0%'],
      translateY: ['120%', '0%'],
      rotate: [50, 0]
    });

    anime({
      ...this.options,
      targets: this.DOM.revealImg,
      duration: 400,
      translateX: ['-50%', '0%'],
      translateY: ['-120%', '0%'],
      rotate: [-50, 0],
      scale: [2, 1]
    });
  }

  hideImage() {
    anime.remove(this.DOM.revealInner);
    anime.remove(this.DOM.revealImg);

    this.tl = anime
      .timeline({
        begin: () => {
          anime.set(this.DOM.el, {
            zIndex: 999
          });
        },
        complete: () => {
          anime.set(this.DOM.el, { zIndex: '' });
          anime.set(this.DOM.reveal, { opacity: 0 });
        },
        ...this.options
      })
      .add({
        targets: this.DOM.revealInner,
        duration: 400,
        translateY: '-120%',
        rotate: -5
      })
      .add(
        {
          targets: this.DOM.revealImg,
          duration: 400,
          translateY: '120%',
          rotate: 5,
          scale: 1.2
        },
        '-=400'
      );
  }
}
