import Component from '../component';
import styles from './ol-success-message.scss';

export default class OlSuccessMessage extends Component {
  static get observedAttributes() { return ['title', 'message']; }

  template() {
    return `
      <div class="modal">
        <ol-logotype></ol-logotype>
        <ol-ok-icon></ol-ok-icon>
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

customElements.define('ol-success-message', OlSuccessMessage);
