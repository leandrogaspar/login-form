describe('ol-password-strength', () => {
  let component;
  let root;

  /**
   * Set the inputText on the Senha field and check if the inputElement
   * has a 'valid' or 'invalid' class
   */
  function checkInput(valid, inputText) {
    if (inputText) {
      const input = root.querySelector('input');
      input.value = inputText;
      input.dispatchEvent(new CustomEvent('change', {}));
    }
    if (valid) {
      expect(root.querySelector('input').classList.contains('valid')).toBeTruthy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeFalsy();
    } else {
      expect(root.querySelector('input').classList.contains('valid')).toBeFalsy();
      expect(root.querySelector('input').classList.contains('invalid')).toBeTruthy();
    }
  }

  /**
   * Checks both the rule and input classes
   */
  function checkRuleIndicator(rule, inputText, validRule, validInput) {
    const ruleClass = validRule ? 'valid-rule' : 'invalid-rule';
    checkInput(validInput, inputText);
    expect(root.getElementById(rule).classList.contains(ruleClass)).toBeTruthy();
  }

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

  it('must have the label text', () => {
    expect(root.querySelector('label').textContent).toBe('Senha');
  });

  it('password input can be disabled using the "disabled" attribute', () => {
    component = fixture('<ol-password-strength disabled="disabled"></ol-password-strength>');
    root = component.shadowRoot;
    expect(root.querySelector('input').disabled).toBeTruthy();
  });

  it('input value is preserved if something trigger a change', () => {
    const inputElement = root.querySelector('input');
    inputElement.value = 'Abcd';
    inputElement.dispatchEvent(new CustomEvent('change', {}));
    component.setAttribute('disabled', 'disabled');
    expect(root.querySelector('input').value).toBe('Abcd');
  });

  describe('valid password', () => {
    it('must be valid if password has one uppercase letter, one number and have at least 6 char', () => {
      checkInput(true, 'A2a45aa');
    });

    it('must set the rule-1 to valid if password has at least 6 char', () => {
      checkRuleIndicator('rule-1', 'aaaaaa', true, false);
    });

    it('must set the rule-2 to valid if password has at least one uppercase', () => {
      checkRuleIndicator('rule-2', 'A', true, false);
    });

    it('must set the rule-3 to valid if password has at least one number', () => {
      checkRuleIndicator('rule-3', '1', true, false);
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
  });

  describe('invalid passwords', () => {
    it('input and rule 1 must be invalid if password does not have at least 6 chars', () => {
      checkRuleIndicator('rule-1', 'A2a45', false, false);
    });

    it('input and rule 2 must be invalid if password does not have at least one upper case char', () => {
      checkRuleIndicator('rule-2', 'a2a45afsafa', false, false);
    });

    it('input and rule 3 must be invalid if password does not have at least one number', () => {
      checkRuleIndicator('rule-3', 'aaaaaaaaaAAAAAAAAAAA', false, false);
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
