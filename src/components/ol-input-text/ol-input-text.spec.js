describe('ol-input-text', () => {
  let component;
  let root;
  const label = 'Hey this is a test';
  const baseId = 'test-input';
  const validator = '^[a-zA-Z]+$';

  beforeEach(() => {
    component = fixture(`<ol-input-text baseId="${baseId}" label="${label}" validator="${validator}"></ol-input-text>`);
    root = component.shadowRoot;
  });

  it('shadowRoot must be defined', () => {
    expect(root).toBeDefined();
  });

  it(`has a validator attribute with value ${validator}`, () => {
    expect(component.getAttribute('validator')).toBe(validator);
  });

  it('at start input does not have valid class', () => {
    expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
  });

  it('at start input does not have invalid class', () => {
    expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
  });

  it('if input changes, dispatches an onChange event', () => {

  });

  it(`component is invalid if does not match ${validator}`, () => {
    const input = root.querySelector('input');
    input.value = '042104891904';
    input.dispatchEvent(new CustomEvent('change', {}));
    expect(component.getAttribute('valid')).toBe('false');
    expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
    expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
  });

  it(`component is valid if match ${validator}`, () => {
    const input = root.querySelector('input');
    input.value = 'fsafaf';
    input.dispatchEvent(new CustomEvent('change', {}));
    expect(component.getAttribute('valid')).toBe('true');
    expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
    expect(root.querySelector('input').classList.contains('valid')).toBeTruthy();
  });

  describe('label', () => {
    it(`must have a label with id ${baseId}-label`, () => {
      expect(root.querySelector('label').getAttribute('id')).toBe(`${baseId}-label`);
    });

    it(`must have a label with text ${label}`, () => {
      expect(root.querySelector('label').textContent).toBe(label);
    });

    it('must have a label with for equals to the input id', () => {
      expect(root.querySelector('label').getAttribute('for')).toBe(root.querySelector('input').getAttribute('id'));
    });
  });

  describe('input', () => {
    it(`must have a input with id ${baseId}-input`, () => {
      expect(root.querySelector('input').getAttribute('id')).toBe(`${baseId}-input`);
    });
  });
});
