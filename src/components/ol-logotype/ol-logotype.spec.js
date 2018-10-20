describe('ol-logotype', () => {
  let component;
  let root;

  beforeEach(() => {
    component = fixture('<ol-logotype></ol-logotype>');
    root = component.shadowRoot;
  });

  it('title should be olist', () => {
    expect(root.querySelector('title').innerHTML).toBe('Olist');
  });

  it('svg width is equals to 76', () => {
    expect(root.querySelector('svg').getAttribute('width')).toEqual('76');
  });

  it('svg height is equals to 30', () => {
    expect(root.querySelector('svg').getAttribute('height')).toEqual('30');
  });
});
