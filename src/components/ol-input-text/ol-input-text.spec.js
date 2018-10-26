describe('ol-input-text', () => {
  let component;
  let root;
  let inputElement;
  let labelElement;

  const label = 'Hey this is a test';
  const name = 'test-input';
  const validator = '^[a-zA-Z]+$';
  const type = 'password';


  beforeEach(() => {
    component = fixture(`<ol-input-text name="${name}" type="${type}" label="${label}" validator="${validator}"></ol-input-text>`);
    root = component.shadowRoot;
    inputElement = root.querySelector('input');
    labelElement = root.querySelector('label');
  });

  it('shadowRoot must be defined', () => {
    expect(root).toBeDefined();
  });

  it('it is possible to set a validator attribute', () => {
    expect(component.getAttribute('validator')).toBe(validator);
  });

  it('the type attribute sets the input type', () => {
    expect(inputElement.getAttribute('type')).toBe(type);
  });

  it('at start input does not have valid class', () => {
    expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
  });

  it('at start input does not have invalid class', () => {
    expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
  });

  it(`component is invalid if the value does not match ${validator}`, () => {
    inputElement.value = '042104891904';
    inputElement.dispatchEvent(new CustomEvent('change', {}));
    expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
    expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
  });

  it(`component is valid if the value does match ${validator}`, () => {
    inputElement.value = 'fsafaf';
    inputElement.dispatchEvent(new CustomEvent('change', {}));
    expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
    expect(root.querySelector('input').classList.contains('valid')).toBeTruthy();
  });

  describe('label', () => {
    it(`must have a label with id ${name}-label`, () => {
      expect(labelElement.getAttribute('id')).toBe(`${name}-label`);
    });

    it(`must have a label with text ${label}`, () => {
      expect(labelElement.textContent).toBe(label);
    });

    it('must have a label with for equals to the input id', () => {
      expect(labelElement.getAttribute('for')).toBe(inputElement.getAttribute('id'));
    });
  });

  describe('input', () => {
    it(`must have a input with id ${name}-input`, () => {
      expect(inputElement.getAttribute('id')).toBe(`${name}-input`);
    });

    it('can be disabled using the "disabled" attribute', () => {
      component = fixture(`<ol-input-text name="${name}" label="${label}" validator="${validator}" disabled="disabled"></ol-input-text>`);
      root = component.shadowRoot;
      expect(root.getElementById(`${name}-input`).disabled).toBeTruthy();
    });

    it('can be disabled by setting the "disabled" attribute', () => {
      component = fixture(`<ol-input-text name="${name}" label="${label}" validator="${validator}"></ol-input-text>`);
      root = component.shadowRoot;
      component.setAttribute('disabled', 'disabled');
      expect(root.getElementById(`${name}-input`).disabled).toBeTruthy();
    });

    it('preserve the value if something trigger a change', () => {
      inputElement.value = 'Abcd';
      inputElement.dispatchEvent(new CustomEvent('change', {}));
      component.setAttribute('validator', 'sfnjaoifnsaf');
      expect(root.querySelector('input').value).toBe('Abcd');
    });

    it('inputs change trigger the onChange event', (done) => {
      const input = root.querySelector('input');
      component.addEventListener('onChange', (event) => {
        expect(event.detail).toEqual({
          name,
          value: 'Eita',
          isValid: true,
        });
        done();
      });

      input.value = 'Eita';
      input.dispatchEvent(new CustomEvent('change'));
    });
  });
});
