import VirtualScroll from 'virtual-scroll'
import inobounce from 'inobounce'
import loop from '../helpers/loop'

const roundDec = n => Math.round(n * 100) / 100
const lerp = (a, b, n) => (1 - n) * a + n * b

export default class Scroll {
  constructor(el) {
    this.el = el

    this.scrollY = 0
    this.translate = 0

    this.mob = window.innerWidth <= 500

    this.setup()
  }

  setup() {
    loop.start()

    this.vs = new VirtualScroll({
      mouseMultiplier: 0.4,
      touchMultiplier: 4,
      passive: true
    })

    this.vs.on(e => {
      const scroll = this.scrollY + -1 * e.deltaY

      this.scrollY = Math.min(
        Math.max(scroll, 0),
        this.el.getBoundingClientRect().height - window.innerHeight
      )
    })

    loop.add(this.checkSmooth.bind(this), 'checkSmooth')

    inobounce.enable()
  }

  checkSmooth() {
    if (Math.round(this.scrollY) !== Math.round(this.translate)) {
      this.translate = roundDec(
        lerp(this.translate, this.scrollY, this.mob ? 0.1 : 0.05)
      )
      this.el.style.transform = `translate3d(0, -${this.translate}px, 0)`
      window.lerpedScrollY = this.translate
    }
  }
}
