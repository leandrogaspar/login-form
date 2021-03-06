import Component from '../component';

export default class LfOkIcon extends Component {
  template() {
    return `
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Tudo certo</title>
      <path d="M36.0001 50.3399L27.6601 41.9999L24.8201 44.8199L36.0001 55.9999L60.0001 31.9999L57.1801 29.1799L36.0001 50.3399Z" fill="#17D499"/>
      <circle cx="42" cy="42" r="40.5" stroke="#17D499" stroke-width="3"/>
    </svg>`;
  }
}

customElements.define('lf-ok-icon', LfOkIcon);
