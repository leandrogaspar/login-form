describe('ol-button', () => {
  let component;
  let root;
  const label = 'Hey this is a test';
  const buttonId = 'test-button';

  beforeEach(() => {
    component = fixture(`<ol-button buttonId="${buttonId}" label="${label}"></ol-button>`);
    root = component.shadowRoot;
  });

  it('shadowRoot must be defined', () => {
    expect(root).toBeDefined();
  });

  it('text must be equal to label', () => {
    expect(root.querySelector('button').textContent).toBe(label);
  });

  it('button id must be equal to value passed', () => {
    expect(root.getElementById(buttonId)).toBeTruthy();
  });

  it('button is enabled by default', () => {
    expect(root.getElementById(buttonId).disabled).toBeFalsy();
  });

  it('button can be disabled passin "disabled" attribute', () => {
    component = fixture(`<ol-button buttonId="${buttonId}" label="${label}" disabled="disabled"></ol-button>`);
    root = component.shadowRoot;
    expect(root.getElementById(buttonId).disabled).toBeTruthy();
  });
});
