export default class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = `
      <h1>Hello world!</h1>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('hello-world', HelloWorld);
