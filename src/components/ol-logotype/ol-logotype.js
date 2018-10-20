export default class OlLogotype extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = document.createElement('template');
    // Hardcoded taken from https://olist.com/
    template.innerHTML = `
      <svg width="76" height="30" viewBox="0 0 76 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Olist</title>
        <g id="Canvas" transform="translate(-5894 1884)">
          <g id="logotype">
            <use xlink:href="#path0_fill" transform="translate(5894 -1884)" fill="#0C29D0"></use>
            <use xlink:href="#path1_fill" transform="translate(5894 -1884)" fill="#0C29D0"></use>
            <use xlink:href="#path2_fill" transform="translate(5894 -1884)" fill="#0C29D0"></use>
            <use xlink:href="#path3_fill" transform="translate(5894 -1884)" fill="#0C29D0"></use>
            <use xlink:href="#path4_fill" transform="translate(5894 -1884)" fill="#0C29D0"></use>
          </g>
        </g>
        <defs>
          <path id="path0_fill" d="M 10.9697 8.34646C 4.5707 8.34646 0 13.0709 0 19.1732C 0 25.2756 4.5707 30 10.9697 30C 17.3289 30 21.8996 25.2756 21.8996 19.1732C 21.8996 13.0709 17.3289 8.34646 10.9697 8.34646ZM 16.1366 19.1732C 16.1366 22.5591 14.0698 25.1968 10.9697 25.1968C 7.86955 25.1968 5.76305 22.5591 5.76305 19.1732C 5.76305 15.7874 7.86955 13.1496 10.9697 13.1496C 14.0698 13.1496 16.1366 15.7874 16.1366 19.1732Z"></path>
          <path id="path1_fill" d="M 30.81 0L 25.1662 0L 25.1662 29.5276L 30.81 29.5276L 30.81 0Z"></path>
          <path id="path2_fill" d="M 41.1546 29.5276L 41.1546 8.8189L 35.5108 8.8189L 35.5108 29.5276L 41.1546 29.5276ZM 41.1546 5.94488L 41.1546 1.1811L 35.5108 1.1811L 35.5108 5.94488L 41.1546 5.94488Z"></path>
          <path id="path3_fill" d="M 60.3227 11.063C 58.3751 9.25197 55.8712 8.34646 53.089 8.34646C 49.2735 8.34646 45.6169 10.4724 45.6169 14.685C 45.6169 18.3071 48.3594 19.7244 50.8633 20.7874C 52.9301 21.6929 54.8378 22.3228 54.8378 23.7795C 54.8378 25.0394 53.3275 25.5905 52.1749 25.5905C 50.1479 25.5905 48.8363 24.685 47.2465 23.1496L 44.0271 26.4567C 46.3323 28.7402 49.194 30 52.4531 30C 56.5071 30 60.4816 27.9134 60.4816 23.3465C 60.4816 19.4094 57.0636 18.0709 54.3609 16.9685C 52.6121 16.2598 51.062 15.5905 51.062 14.2913C 51.062 13.3071 52.0159 12.7165 53.089 12.7165C 54.6788 12.7165 56.1494 13.5039 57.2225 14.4488L 60.3227 11.063Z"></path>
          <path id="path4_fill" d="M 75.4038 13.4646L 75.4038 8.8189L 70.0779 8.8189L 70.0779 4.25197L 65.3085 4.25197L 64.4341 8.8189L 61.9302 8.8189L 61.9302 13.4646L 64.4341 13.4646L 64.4341 22.0866C 64.4341 23.3071 64.5136 24.5276 64.8316 25.5512C 65.5867 28.2283 67.7727 30 71.0318 30C 72.6614 30 74.6486 29.5669 76 28.7795L 74.2512 24.6457C 73.5358 25 72.8601 25.2362 71.9857 25.2362C 70.7933 25.2362 70.3164 24.4882 70.1574 23.2677C 70.0779 22.6772 70.0779 22.126 70.0779 21.4961L 70.0779 13.4646L 75.4038 13.4646Z"></path>
        </defs>
      </svg>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('ol-logotype', OlLogotype);
