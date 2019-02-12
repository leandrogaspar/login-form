describe('lf-success-message', () => {
  let component;
  let root;
  const title = 'Hey this is a test';
  const message = 'Verifique sua caixa de entrada para confirmar seu e-mail.';

  beforeEach(() => {
    component = fixture(`<lf-success-message title="${title}" message="${message}"></lf-success-message>`);
    root = component.shadowRoot;
  });

  it('shadowRoot must be defined', () => {
    expect(root).toBeDefined();
  });

  it('must set h1 text to title attribute', () => {
    expect(root.querySelector('h1').textContent).toBe(title);
  });

  it('must set p text to message attribute', () => {
    expect(root.querySelector('p').textContent).toBe(message);
  });
});
