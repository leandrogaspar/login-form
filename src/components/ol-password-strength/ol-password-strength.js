import Component from '../component';
import styles from './ol-password-strength.scss';

export default class OlPasswordStrength extends Component {
  template() {
    return `
      <div class="form-row">
        <label id="password-strength-label" for="password-strength-input" class="label">Senha</label>
        <input type="password" name="name" id="password-strength-input" class="input">
      </div>
      <div class="indicator-row">
        <div id="indicator-1" class="indicator"></div>
        <div id="indicator-2" class="indicator"></div>
        <div id="indicator-3" class="indicator"></div>
      </div>
      <div class="rule-row">
        <div id="rule-1" class="default-rule"></div>
        <span class="label rules">Pelo menos 6 caracteres</span>
      </div>
      <div class="rule-row">
        <div id="rule-2" class="default-rule"></div>
        <span class="label rules">Pelo menos 1 letra maíuscula</span>
      </div>
      <div class="rule-row last-rule-row" >
        <div id="rule-3" class="default-rule"></div>
        <span class="label rules">Pelo menos 1 número</span>
      </div>
    `;
  }

  styles() {
    return styles;
  }

  onConnected() {
    // Create references to our elements
    this.inputElement = this.shadowRoot.querySelector('input');
    this.indicatorOne = this.shadowRoot.getElementById('indicator-1');
    this.indicatorTwo = this.shadowRoot.getElementById('indicator-2');
    this.indicatorThree = this.shadowRoot.getElementById('indicator-3');

    //https://www.youtube.com/watch?v=k2qgadSvNyU
    this.ruleOne = this.shadowRoot.getElementById('rule-1'); //Don't pick up the phone
    this.ruleTwo = this.shadowRoot.getElementById('rule-2'); //Don't let him in
    this.ruleThree = this.shadowRoot.getElementById('rule-3'); //Don't be his friend

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
    // First do our validation then update the component
    this.validatePassword();
    this.updateComponent();

    // Dispatch the change as our custom event
    this.dispatchEvent(new CustomEvent('onChange', {
      detail: {
        value: this.inputElement.value,
        isValid: this.inValidFieldsCount === 0
      }
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
  }

  decreaseInvalidFieldsCount() {
    this.inValidFieldsCount = this.inValidFieldsCount - 1;
  }

  updateComponent() {
    this.updateInputElement();
    this.updateIndicatorsClasses();
    this.updateRulesClasses();
  }

  updateInputElement() {
    this.inputElement.classList.remove('valid', 'invalid');

    if (this.inValidFieldsCount === 0) {
      this.inputElement.classList.add('valid');
    } else {
      this.inputElement.classList.add('invalid');
    }
  }

  updateIndicatorsClasses() {
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

  updateRulesClasses() {
    this.updateRule(this.hasSixChar, this.ruleOne);
    this.updateRule(this.hasUpperCase, this.ruleTwo);
    this.updateRule(this.hasNumber, this.ruleThree);
  }

  updateRule(valid, rule) {
    if (valid) {
      rule.className = 'valid-rule';
    } else {
      rule.className = 'invalid-rule';
    }
  }
}

customElements.define('ol-password-strength', OlPasswordStrength);
