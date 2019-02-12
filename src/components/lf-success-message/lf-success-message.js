import Component from '../component';
import styles from './lf-success-message.scss';

export default class LfSuccessMessage extends Component {
  static get observedAttributes() { return ['title', 'message']; }

  template() {
    return `
      <div class="modal">
        <lf-logotype></lf-logotype>
        <lf-ok-icon></lf-ok-icon>
        <h1>${this.title}</h1>
        <p>${this.message}</p>
      </div>
    `;
  }

  styles() {
    return styles;
  }

  get title() { return this.getAttribute('title'); }

  get message() { return this.getAttribute('message'); }
}

customElements.define('lf-success-message', LfSuccessMessage);
