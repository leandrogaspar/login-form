import Component from '../component';
import styles from './lf-new-account.scss';

export default class LfNewAccount extends Component {
  constructor() {
    super();
    this.resetForm();
  }

  static get observedAttributes() { return ['state']; }

  set state(state) { this.setAttribute('state', state); }

  get state() { return this.getAttribute('state'); }

  isCreating() {
    if (this.state === this.STATES.CREATING) {
      return true;
    }
    return false;
  }

  get STATES() {
    return {
      CREATING: 'CREATING',
      CREATED: 'CREATED',
    };
  }

  resetForm() {
    this.isValidName = false;
    this.isValidEmail = false;
    this.isValidPassword = false;
    this.isValidConfirm = false;
  }


  template() {
    if (this.isCreating()) {
      return this.creatingTemplate();
    }
    return this.createdTemplate();
  }

  createdTemplate() {
    return '<lf-success-message title="Tudo certo" message="Verifique sua caixa de entrada para confirmar seu e-mail."></lf-success-message>';
  }

  creatingTemplate() {
    return `
      <div class="modal" role="form">
        <lf-logotype></lf-logotype>
        <h1 class="create-account-h1">Crie sua conta</h1>
        <lf-input-text id="name" label="Nome completo" baseId="name" validator="^.{6,}$"></lf-input-text>
        <lf-input-text id="email" label="E-mail" baseId="email" validator="^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$"></lf-input-text>
        <lf-password-strength id="password-strength"></lf-password-strength>
        <lf-input-text id="confirm-password" type="password" label="Confirme sua senha" baseId="confirmPassword" validator="."></lf-input-text>
        <lf-button id="submit" label="Criar conta" buttonId="create-account" disabled="disabled"></lf-button>
      </div>
    `;
  }

  styles() {
    return styles;
  }

  onConnected() {
    if (!this.isCreating()) {
      return;
    }

    this.name = this.shadowRoot.getElementById('name');
    this.email = this.shadowRoot.getElementById('email');
    this.passwordStrength = this.shadowRoot.getElementById('password-strength');
    this.confirmPassword = this.shadowRoot.getElementById('confirm-password');
    this.submitButton = this.shadowRoot.getElementById('submit');

    this.addValidityListener(this.confirmPassword, 'onChange', 'isValidConfirm');
    this.addValidityListener(this.email, 'onChange', 'isValidEmail');
    this.addValidityListener(this.name, 'onChange', 'isValidName');

    this.passwordStrength.addEventListener('onChange', (event) => {
      this.isValidPassword = event.detail.isValid;
      const escapedValue = event.detail.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      this.confirmPassword.setAttribute('validator', `^${escapedValue}$`);
      this.updateForm();
    });

    this.submitButton.addEventListener('click', this.onSubmit.bind(this));
  }

  onSubmit() {
    setTimeout(this.accountCreated.bind(this), 2000);
    this.name.setAttribute('disabled', 'disabled');
    this.email.setAttribute('disabled', 'disabled');
    this.confirmPassword.setAttribute('disabled', 'disabled');
    this.passwordStrength.setAttribute('disabled', 'disabled');
    this.submitButton.setAttribute('state', 'loading');
  }

  accountCreated() {
    this.state = this.STATES.CREATED;
  }

  /**
   * Add a listener in the element to the event.
   * Set the validFlag using the event detail
   */
  addValidityListener(element, event, validFlag) {
    element.addEventListener(event, (e) => {
      this[validFlag] = e.detail.isValid;
      this.updateForm();
    });
  }

  updateForm() {
    if (this.isValidForm()) {
      this.submitButton.setAttribute('disabled', 'enabled');
    } else {
      this.submitButton.setAttribute('disabled', 'disabled');
    }
  }

  isValidForm() {
    return this.isValidName && this.isValidEmail && this.isValidPassword && this.isValidConfirm;
  }
}

customElements.define('lf-new-account', LfNewAccount);
