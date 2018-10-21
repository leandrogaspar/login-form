export default class OlButton extends HTMLElement {
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
      <button id="${this.buttonId}" class="button" ${this.disabled}>${this.label}</button>
    `;
    return template;
  }

  componentCss() {
    this.componentCss = `
    .button {
      margin-top: 8px;
      background: #17D499;
      transition: background-color .25s ease-out,color .25s ease-out;
      width: 100%;

      padding: 1em 1.87em;
      -webkit-appearance: none;
      border: 1px solid transparent;
      border-radius: 3px;
      cursor: pointer;

      font-weight: 700;
      font-family: SF Pro Text;
      line-height: 26px;
      font-size: 16px;
      text-align: center;
      color: #FFFFFF;
    }

    .button:hover {
      background-color: #00ba7f;
    }

    .button:disabled {
      cursor: not-allowed;
    }
    `;
    return this.componentCss;
  }

  connectedCallback() {
    // First, add our label and input to the shadowDOM
    this.shadowRoot.appendChild(this.componentTeplate.content.cloneNode(true));

    // Create references to ours elements
    this.buttonElement = this.shadowRoot.querySelector('button');

    // Now, let's add our listeners
    this.buttonElement.addEventListener('click', this.onClicked.bind(this));
  }

  onClicked() {
    // Dispatch the click as our custom event
    this.dispatchEvent(new CustomEvent('onClick', {}));
  }

  get buttonId() { return this.getAttribute('buttonId'); }

  set buttonId(buttonId) { this.setAttribute('buttonId', buttonId); }

  get label() { return this.getAttribute('label'); }

  set label(label) { this.setAttribute('label', label); }

  get disabled() { return this.getAttribute('disabled') || ''; }

  set disabled(disabled) { this.setAttribute('disabled', disabled); }
}

customElements.define('ol-button', OlButton);
