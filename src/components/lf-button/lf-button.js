import Component from '../component';
import styles from './lf-button.scss';

export default class LfButton extends Component {
  static get observedAttributes() { return ['buttonId', 'disabled', 'label', 'state']; }

  template() {
    if (this.state === 'loading') {
      return `
      <div id="loading-container" class="loading-button">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>`;
    }
    return `
      <button id="${this.buttonId}" class="button ${this.state}" ${this.disabled}>${this.label}</button>`;
  }

  styles() {
    return styles;
  }

  onConnected() {
    if (this.isLoading()) { return; }

    // Create references to our element
    this.buttonElement = this.shadowRoot.querySelector('button');

    // Now, let's add our listeners
    this.buttonElement.addEventListener('click', this.onClicked.bind(this));
  }

  onClicked() {
    // Dispatch the click as our custom event
    this.dispatchEvent(new CustomEvent('onClick', { detail: this.buttonId }));
  }

  isLoading() {
    return this.state === 'loading';
  }

  get buttonId() { return this.getAttribute('buttonId'); }

  get label() { return this.getAttribute('label'); }

  get disabled() { return this.getAttribute('disabled') || ''; }

  get state() { return this.getAttribute('state') || ''; }
}

customElements.define('lf-button', LfButton);
