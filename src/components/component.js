/**
 * Base component class.
 * Users can extend this class and implement their own custom elements.
 */
export default class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.connected = false;
  }

  /**
   * Return your html as string here, react-style :)
   */
  template() { return ''; }

  /**
   * Return your css as string here
   */
  styles() { return ''; }

  /**
   * Called each time the HTML from template() is appended
   * in the document.
   * Invoked each time the custom element is appended into a document-connected element.
   * Will also be invoked each time one of the attributes defined on the observedAttributes
   * function changes.
   */
  onConnected() { }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   */
  onDisconnected() { }

  connectedCallback() {
    this.createTemplate();

    this.connected = true;

    this.connectTemplate();
  }

  disconnectedCallback() {
    this.onDisconnected();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.connectTemplate();
  }

  createTemplate() {
    // Create the template
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.styles()}</style>
      <div id="template-container">
      </div>
    `;

    // Append the template on the shadow DOM and get a ref to the container
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.container = this.shadowRoot.getElementById('template-container');
  }

  connectTemplate() {
    if (!this.connected) {
      return;
    }

    const template = this.template();

    // Avoid unnecessary layout reflows
    if (this.container.innerHTML !== template) {
      this.container.innerHTML = template;
    }

    // Call the component lifecycle callback
    this.onConnected();
  }
}
