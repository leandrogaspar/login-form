describe('lf-logotype', () => {
  let component;
  let root;

  beforeEach(() => {
    component = fixture('<lf-logotype></lf-logotype>');
    root = component.shadowRoot;
  });

  it('title should be olist', () => {
    expect(root.querySelector('title').textContent).toBe('Login Form Test');
  });

  it('svg width is equals to 88', () => {
    expect(root.querySelector('svg').getAttribute('width')).toBe('88');
  });

  it('svg height is equals to 35', () => {
    expect(root.querySelector('svg').getAttribute('height')).toBe('35');
  });
});
