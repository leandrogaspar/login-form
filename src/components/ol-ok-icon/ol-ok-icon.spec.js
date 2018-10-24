describe('ol-ok-icon', () => {
  let component;
  let root;

  beforeEach(() => {
    component = fixture('<ol-ok-icon></ol-ok-icon>');
    root = component.shadowRoot;
  });

  it('title should be Tudo certo', () => {
    expect(root.querySelector('title').textContent).toBe('Tudo certo');
  });

  it('svg width is equals to 84', () => {
    expect(root.querySelector('svg').getAttribute('width')).toBe('84');
  });

  it('svg height is equals to 84', () => {
    expect(root.querySelector('svg').getAttribute('height')).toBe('84');
  });
});
