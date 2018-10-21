describe('ol-password-strength', () => {
  let component;
  let root;

  beforeEach(() => {
    component = fixture('<ol-password-strength></ol-password-strength>');
    root = component.shadowRoot;
  });

  it('shadowRoot must be defined', () => {
    expect(root).toBeDefined();
  });

  it('at start input does not have valid class', () => {
    expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
  });

  it('at start input does not have invalid class', () => {
    expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
  });

  it('at start input does not have one-invalid class', () => {
    expect(root.querySelector('input').classList.contains('one-invalid')).toBeFalsy();
  });

  it('at start input does not have two-invalid class', () => {
    expect(root.querySelector('input').classList.contains('two-invalid')).toBeFalsy();
  });

  it('must have a "Senha" label', () => {
    expect(root.querySelector('label').textContent).toBe('Senha');
  });

  describe('valid password', () => {
    it('must be valid if password has one uppercase letter, one number and have at least 6 char', () => {
      const input = root.querySelector('input');
      input.value = 'A2a45aa';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(component.getAttribute('valid')).toBe('true');
      expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('valid')).toBeTruthy();
    });
  });

  describe('invalid passwords', () => {
    it('must be invalid if password does not have at least 6 chars', () => {
      const input = root.querySelector('input');
      input.value = 'A2a45';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(component.getAttribute('valid')).toBe('false');
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-1').classList.contains('invalid-rule')).toBeTruthy();
      expect(root.getElementById('rule-1').classList.contains('valid-rule')).toBeFalsy();
    });

    it('must be invalid if password does not have at least one upper case char', () => {
      const input = root.querySelector('input');
      input.value = 'a2a45afsafa%@!';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(component.getAttribute('valid')).toBe('false');
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-2').classList.contains('invalid-rule')).toBeTruthy();
      expect(root.getElementById('rule-2').classList.contains('valid-rule')).toBeFalsy();
    });

    it('must be invalid if password does not have at least one number', () => {
      const input = root.querySelector('input');
      input.value = 'aaaaaaaaaAAAAAAAAAAA';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(component.getAttribute('valid')).toBe('false');
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-3').classList.contains('invalid-rule')).toBeTruthy();
      expect(root.getElementById('rule-3').classList.contains('valid-rule')).toBeFalsy();
    });
  });
});
