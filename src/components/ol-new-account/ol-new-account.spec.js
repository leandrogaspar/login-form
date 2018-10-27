describe('ol-new-account', () => {
  let component;
  let root;

  function fillInput(inputId, value) {
    const inputComponent = root.getElementById(inputId);
    const input = inputComponent.shadowRoot.querySelector('input');
    input.value = value;
    input.dispatchEvent(new CustomEvent('change', {}));
  }

  beforeEach(() => {
    component = fixture('<ol-new-account state="CREATING"></ol-new-account>');
    root = component.shadowRoot;
  });

  it('on the CREATING state component must have all the form elements', () => {
    expect(root.querySelector('ol-logotype')).toBeTruthy();
    expect(root.getElementById('name')).toBeTruthy();
    expect(root.getElementById('email')).toBeTruthy();
    expect(root.getElementById('password-strength')).toBeTruthy();
    expect(root.getElementById('confirm-password')).toBeTruthy();
    expect(root.getElementById('submit')).toBeTruthy();
  });

  it('on the CREATED state component must have the success message', () => {
    component = fixture('<ol-new-account state="CREATED"></ol-new-account>');
    root = component.shadowRoot;
    expect(root.querySelector('ol-success-message')).toBeTruthy();
  });

  it('the submit button must be disabled until the form is valid', () => {
    fillInput('password-strength', 'Abc123');
    fillInput('confirm-password', '42141412');
    expect(root.getElementById('submit').getAttribute('disabled')).toBe('disabled');
  });

  it('the submit button must be enabled if form is valid', () => {
    fillInput('name', 'Leandro Gaspar');
    fillInput('email', 'leandro@gaspar.com');
    fillInput('password-strength', 'Abc123');
    fillInput('confirm-password', 'Abc123');

    expect(root.getElementById('submit').getAttribute('disabled')).not.toBe('disabled');
  });

  it('when the form is submitted it should present a loading status', () => {
    fillInput('name', 'Leandro Gaspar');
    fillInput('email', 'leandro@gaspar.com');
    fillInput('password-strength', 'Abc123');
    fillInput('confirm-password', 'Abc123');
    root.getElementById('submit').shadowRoot.querySelector('button').click();

    expect(root.getElementById('submit').getAttribute('state')).toBe('loading');
  });
});
