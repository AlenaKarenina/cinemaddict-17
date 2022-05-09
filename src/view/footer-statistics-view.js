import {createElement} from '../render.js';

const footerStatisticsElement = () => (`
  <section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>
`);

export default class FooterStatisticsView {
  #element = null;

  get template() {
    return footerStatisticsElement();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
