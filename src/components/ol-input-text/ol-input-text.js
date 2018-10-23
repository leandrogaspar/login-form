import Component from '../component';
import styles from './ol-input-text.scss';

export default class OlInputText extends Component {
  static get observedAttributes() { return ['name', 'disabled', 'label', 'validator']; }

  template() {
    return `
      <div class="form-row">
        <label id="${this.name}-label" for="${this.name}-input" class="label">${this.label}</label>
        <input type="text" name="${this.name}" id="${this.name}-input" class="input" ${this.disabled}>
      </div>`;
  }

  styles() {
    return styles;
  }

  onConnected() {
    // Create references the component elements
    this.labelElement = this.shadowRoot.querySelector('label');
    this.inputElement = this.shadowRoot.querySelector('input');

    // Now, listen to changes
    this.inputElement.addEventListener('change', this.onInputChange.bind(this));
    this.inputElement.addEventListener('keyup', this.onInputChange.bind(this));
  }

  onInputChange() {
    const valid = this.isValid();
    this.setInputValidClass(valid);

    // Dispatch the change as our custom event
    this.dispatchEvent(new CustomEvent('onChange', {
      detail: {
        name: this.name,
        value: this.inputElement.value,
        isValid: valid,
      }
    }));
  }

  isValid() {
    const regex = new RegExp(this.validator);
    return regex.test(this.inputElement.value);
  }

  setInputValidClass(valid) {
    if (valid) {
      this.inputElement.classList.add('valid');
      this.inputElement.classList.remove('invalid');
    } else {
      this.inputElement.classList.add('invalid');
      this.inputElement.classList.remove('valid');
    }
  }

  get name() { return this.getAttribute('name'); }

  get label() { return this.getAttribute('label'); }

  get validator() { return this.getAttribute('validator') || '.'; }

  get disabled() { return this.getAttribute('disabled') || ''; }
}

customElements.define('ol-input-text', OlInputText);
