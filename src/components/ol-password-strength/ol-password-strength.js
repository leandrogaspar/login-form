export default class OlPasswordStrength extends HTMLElement {
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
        <label id="password-strength-label" for="password-strength-input" class="label">Senha</label>
        <input type="text" name="name" id="password-strength-input" class="input">
      </div>
      <div class="wrapper-row indicator-row">
        <div id="indicator-1" class="indicator"></div>
        <div id="indicator-2" class="indicator"></div>
        <div id="indicator-3" class="indicator"></div>
      </div>
      <div class="wrapper-row">
        <div id="rule-1" class="default-ellipse"></div>
        <span class="label rules">Pelo menos 6 caracteres</span>
      </div>
      <div class="wrapper-row">
        <div id="rule-2" class="default-ellipse"></div>
        <span class="label rules">Pelo menos 1 letra maíuscula</span>
      </div>
      <div class="wrapper-row last-row">
        <div id="rule-3" class="default-ellipse"></div>
        <span class="label rules">Pelo menos 1 número</span>
      </div>
    `;
    return template;
  }

  componentCss() {
    this.componentCss = `
    .wrapper {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;label
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .wrapper-row {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;label
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      align-items: center;
      margin-bottom: 12px;
    }

    .last-row {
      margin-bottom: 24px;
    }

    .label {
      font-family: SF Pro Text;
      line-height: 26px;
      font-size: 16px;
      color: #696D8C;
    }

    .input {
      margin-bottom: 8px;
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
    }

    .default-ellipse {
      width: 10px;
      height: 10px;
      background: #EAEAF4;
      border-radius: 50%;
    }

    .rules {
      line-height: 16px;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: 7px;
    }

    .indicator-row {
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .indicator {
      background: #EAEAF4;
      border-radius: 10px;
      width: 32%;
      height: 8px;
    }

    .valid-indicator {
      background: #1FE6A8;
    }

    .one-invalid-indicator {
      background: #F7BC1C;
    }

    .two-invalid-indicator {
      background: #F79682;
    }

    .valid-rule {
      background: #1FE6A8;
    }

    .invalid-rule {
      background: #F79682;
    }
    `;
    return this.componentCss;
  }

  connectedCallback() {
    // First, add our label and input to the shadowDOM
    this.shadowRoot.appendChild(this.componentTeplate.content.cloneNode(true));

    // Create references to our elements
    this.labelElement = this.shadowRoot.querySelector('label');
    this.inputElement = this.shadowRoot.querySelector('input');
    this.indicatorOne = this.shadowRoot.getElementById('indicator-1');
    this.indicatorTwo = this.shadowRoot.getElementById('indicator-2');
    this.indicatorThree = this.shadowRoot.getElementById('indicator-3');
    this.ruleOne = this.shadowRoot.getElementById('rule-1');
    this.ruleTwo = this.shadowRoot.getElementById('rule-2');
    this.ruleThree = this.shadowRoot.getElementById('rule-3');

    // Now, let's add our listeners
    this.inputElement.addEventListener('change', this.onInputChange.bind(this));
    this.inputElement.addEventListener('keyup', this.onInputChange.bind(this));

    // Our initial state
    this.hasSixChar = false;
    this.hasUpperCase = false;
    this.hasNumber = false;
    this.inValidFieldsCount = 3;
  }

  onInputChange() {
    // First do our validation log then update the component
    this.validatePassword();
    this.updateComponent();

    // Dispatch the change as our custom event
    this.dispatchEvent(new CustomEvent('onChange', {
      value: this.inputElement.value,
      isValid: this.inValidFieldsCount === 0,
    }));
  }

  validatePassword() {
    const password = this.inputElement.value;

    this.hasSixChar = /^.{6,}$/.test(password);
    this.hasUpperCase = /[A-Z]+/.test(password);
    this.hasNumber = /[0-9]+/.test(password);

    this.inValidFieldsCount = 3;
    if (this.hasSixChar) { this.decreaseInvalidFieldsCount(); }
    if (this.hasUpperCase) { this.decreaseInvalidFieldsCount(); }
    if (this.hasNumber) { this.decreaseInvalidFieldsCount(); }

    this.setAttribute('valid', this.inValidFieldsCount === 0);
  }

  decreaseInvalidFieldsCount() {
    this.inValidFieldsCount = this.inValidFieldsCount - 1;
  }

  updateComponent() {
    this.updateInputElement();
    this.updateIndicators();
    this.updateRules();
  }

  updateInputElement() {
    this.inputElement.classList.remove('valid', 'invalid');

    if (this.inValidFieldsCount === 0) {
      this.inputElement.classList.add('valid');
    } else {
      this.inputElement.classList.add('invalid');
    }
  }

  updateIndicators() {
    // Reset everybody
    this.indicatorOne.classList.remove('valid-indicator', 'one-invalid-indicator', 'two-invalid-indicator');
    this.indicatorTwo.classList.remove('valid-indicator', 'one-invalid-indicator', 'two-invalid-indicator');
    this.indicatorThree.classList.remove('valid-indicator', 'one-invalid-indicator', 'two-invalid-indicator');

    // Now set the classes again
    switch (this.inValidFieldsCount) {
      case 0:
        this.indicatorOne.classList.add('valid-indicator');
        this.indicatorTwo.classList.add('valid-indicator');
        this.indicatorThree.classList.add('valid-indicator');
        break;
      case 1:
        this.indicatorOne.classList.add('one-invalid-indicator');
        this.indicatorTwo.classList.add('one-invalid-indicator');
        break;
      case 2:
        this.indicatorOne.classList.add('two-invalid-indicator');
        break;
      default:
        break;
    }
  }

  updateRules() {
    this.ruleOne.classList.remove('valid-rule', 'invalid-rule');
    this.ruleTwo.classList.remove('valid-rule', 'invalid-rule');
    this.ruleThree.classList.remove('valid-rule', 'invalid-rule');

    if (this.hasSixChar) {
      this.ruleOne.classList.add('valid-rule');
    } else {
      this.ruleOne.classList.add('invalid-rule');
    }

    if (this.hasUpperCase) {
      this.ruleTwo.classList.add('valid-rule');
    } else {
      this.ruleTwo.classList.add('invalid-rule');
    }

    if (this.hasNumber) {
      this.ruleThree.classList.add('valid-rule');
    } else {
      this.ruleThree.classList.add('invalid-rule');
    }
  }
}

customElements.define('ol-password-strength', OlPasswordStrength);
