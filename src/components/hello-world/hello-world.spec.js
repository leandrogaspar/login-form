describe('hello-world', () => {
  let component;
  let root;

  beforeEach(() => {
    component = fixture('<hello-world></hello-world>');
    root = component.shadowRoot;
  });

  it('should log oi', () => {
    expect(root.querySelector('h1').innerHTML).toBe('Hello world!');
  });
});
