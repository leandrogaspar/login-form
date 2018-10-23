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

  it('must have a "Senha" label', () => {
    expect(root.querySelector('label').textContent).toBe('Senha');
  });

  describe('valid password', () => {
    it('must be valid if password has one uppercase letter, one number and have at least 6 char', () => {
      const input = root.querySelector('input');
      input.value = 'A2a45aa';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('valid')).toBeTruthy();
    });

    it('triggers an onChange event when you change the input with true isValid', (done) => {
      const input = root.querySelector('input');
      component.addEventListener('onChange', (event) => {
        expect(event.detail).toEqual({
          value: 'A2a45aa',
          isValid: true,
        });
        done();
      });

      input.value = 'A2a45aa';
      input.dispatchEvent(new CustomEvent('change'));
    });

    it('must set the rule-1 to valid if password has at least 6 char', () => {
      const input = root.querySelector('input');
      input.value = 'aaaaaa';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.getElementById('rule-1').classList.contains('valid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
    });

    it('must set the rule-2 to valid if password has at least one uppercase', () => {
      const input = root.querySelector('input');
      input.value = 'A';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.getElementById('rule-2').classList.contains('valid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
    });

    it('must set the rule-3 to valid if password has at least one number', () => {
      const input = root.querySelector('input');
      input.value = '1';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.getElementById('rule-3').classList.contains('valid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
    });
  });

  describe('invalid passwords', () => {
    it('input and rule 1 must be invalid if password does not have at least 6 chars', () => {
      const input = root.querySelector('input');
      input.value = 'A2a45';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-1').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-1').classList.contains('valid')).toBeFalsy();
    });

    it('input and rule 2 must be invalid if password does not have at least one upper case char', () => {
      const input = root.querySelector('input');
      input.value = 'a2a45afsafa%@!';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-2').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-2').classList.contains('valid')).toBeFalsy();
    });

    it('input and rule 3 must be invalid if password does not have at least one number', () => {
      const input = root.querySelector('input');
      input.value = 'aaaaaaaaaAAAAAAAAAAA';
      input.dispatchEvent(new CustomEvent('change', {}));
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-3').classList.contains('invalid')).toBeTruthy();
      expect(root.getElementById('rule-3').classList.contains('valid')).toBeFalsy();
    });

    it('triggers an onChange event when you change the input with false isValid', (done) => {
      const input = root.querySelector('input');
      component.addEventListener('onChange', (event) => {
        expect(event.detail).toEqual({
          value: 'Eita',
          isValid: false,
        });
        done();
      });

      input.value = 'Eita';
      input.dispatchEvent(new CustomEvent('change'));
    });
  });
});
