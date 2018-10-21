export default class OlInputText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get componentTeplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        ${this.componentCss()}
      </style>
      <div class="wrapper">
        <label id="${this.baseId}-label" for="${this.baseId}-input" class="label">${this.label}</label>
        <input type="text" name="name" id="${this.baseId}-input" class="input">
      </div>
    `;
    return template;
  }

  componentCss() {
    this.componentCss = `
    .wrapper {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .label {
      font-family: SF Pro Text;
      line-height: 26px;
      font-size: 16px;
      color: #696D8C;
    }

    .input {
      margin-bottom: 24px;
      height: 44px;
      background: #FFFFFF;
      border: 1px solid #B6B9D0;
      box-sizing: border-box;
      box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.05);
      font-family: Soleil;
      line-height: 26px;
      font-size: 16px;
      text-indent: 16px;
      color: #312F4F;
      outline: none;
    }

    .valid {
      border: 1px solid #17D499;
    }
    .invalid {
      border: 1px solid #F79682;
    }`;
    return this.componentCss;
  }

  connectedCallback() {
    // First, add our label and input to the shadowDOM
    this.shadowRoot.appendChild(this.componentTeplate.content.cloneNode(true));

    // Create references to ours elements
    this.labelElement = this.shadowRoot.querySelector('label');
    this.inputElement = this.shadowRoot.querySelector('input');

    // Now, let's add our listeners
    this.inputElement.addEventListener('change', this.onInputChange.bind(this));
    this.inputElement.addEventListener('keyup', this.onInputChange.bind(this));
  }

  onInputChange() {
    // First do our validation log and update the component
    const valid = this.isValid();
    this.updateComponent(valid);

    // Dispatch the change as our custom event
    this.dispatchEvent(new CustomEvent('onChange', {
      value: this.inputElement.value,
      isValid: valid,
    }));
  }

  updateComponent(isValid) {
    if (isValid) {
      this.inputElement.classList.remove('invalid');
      this.inputElement.classList.add('valid');
      this.setAttribute('valid', true);
    } else {
      this.inputElement.classList.remove('valid');
      this.inputElement.classList.add('invalid');
      this.setAttribute('valid', false);
    }
  }

  isValid() {
    const regex = new RegExp(this.validator);
    return regex.test(this.inputElement.value);
  }

  get baseId() { return this.getAttribute('baseId'); }

  set baseId(baseId) { this.setAttribute('baseId', baseId); }

  get label() { return this.getAttribute('label'); }

  set label(label) { this.setAttribute('label', label); }

  set validator(validator) { this.setAttribute('validator', validator); }

  get validator() { return this.getAttribute('validator'); }
}

customElements.define('ol-input-text', OlInputText);
