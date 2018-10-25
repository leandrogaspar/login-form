import Component from '../component';
import styles from './ol-button.scss';

export default class OlButton extends Component {
  static get observedAttributes() { return ['buttonId', 'disabled', 'label']; }

  template() {
    return `<button id="${this.buttonId}" class="button" ${this.disabled}>${this.label}</button>`;
  }

  styles() {
    return styles;
  }

  onConnected() {
    // Create references to our element
    this.buttonElement = this.shadowRoot.querySelector('button');

    // Now, let's add our listeners
    this.buttonElement.addEventListener('click', this.onClicked.bind(this));
  }

  onClicked() {
    // Dispatch the click as our custom event
    this.dispatchEvent(new CustomEvent('onClick', { detail: this.buttonId }));
  }

  get buttonId() { return this.getAttribute('buttonId'); }

  get label() { return this.getAttribute('label'); }

  get disabled() { return this.getAttribute('disabled') || ''; }
}

customElements.define('ol-button', OlButton);
