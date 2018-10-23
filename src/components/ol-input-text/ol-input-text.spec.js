describe('ol-input-text', () => {
  let component;
  let root;
  const label = 'Hey this is a test';
  const name = 'test-input';
  const validator = '^[a-zA-Z]+$';

  beforeEach(() => {
    component = fixture(`<ol-input-text name="${name}" label="${label}" validator="${validator}"></ol-input-text>`);
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
    expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
    expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
  });

  it(`component is valid if match ${validator}`, () => {
    const input = root.querySelector('input');
    input.value = 'fsafaf';
    input.dispatchEvent(new CustomEvent('change', {}));
    expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
    expect(root.querySelector('input').classList.contains('valid')).toBeTruthy();
  });

  describe('label', () => {
    it(`must have a label with id ${name}-label`, () => {
      expect(root.querySelector('label').getAttribute('id')).toBe(`${name}-label`);
    });

    it(`must have a label with text ${label}`, () => {
      expect(root.querySelector('label').textContent).toBe(label);
    });

    it('must have a label with for equals to the input id', () => {
      expect(root.querySelector('label').getAttribute('for')).toBe(root.querySelector('input').getAttribute('id'));
    });
  });

  describe('input', () => {
    it(`must have a input with id ${name}-input`, () => {
      expect(root.querySelector('input').getAttribute('id')).toBe(`${name}-input`);
    });
  });

  it('input can be disabled using the "disabled" attribute', () => {
    component = fixture(`<ol-input-text name="${name}" label="${label}" validator="${validator}" disabled="disabled"></ol-input-text>`);
    root = component.shadowRoot;
    expect(root.getElementById(`${name}-input`).disabled).toBeTruthy();
  });

  it('input can be disabled by setting the "disabled" attribute', () => {
    component = fixture(`<ol-input-text name="${name}" label="${label}" validator="${validator}"></ol-input-text>`);
    root = component.shadowRoot;
    component.setAttribute('disabled', 'disabled');
    expect(root.getElementById(`${name}-input`).disabled).toBeTruthy();
  });

  it('triggers an onChange event when you change the input', (done) => {
    const input = root.querySelector('input');
    component.addEventListener('onChange', (event) => {
      expect(event.detail).toEqual({
        name: name,
        value: 'Eita',
        isValid: true,
      });
      done();
    });

    input.value = 'Eita';
    input.dispatchEvent(new CustomEvent('change'));
  });
});
