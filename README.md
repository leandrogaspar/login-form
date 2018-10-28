[![Build Status](https://travis-ci.org/leandrogaspar/work-at-olist-front.svg?branch=master)](https://travis-ci.org/leandrogaspar/work-at-olist-front)
[![dependencies Status](https://david-dm.org/leandrogaspar/work-at-olist-front/status.svg)](https://david-dm.org/leandrogaspar/work-at-olist-front)
[![devDependencies Status](https://david-dm.org/leandrogaspar/work-at-olist-front/dev-status.svg)](https://david-dm.org/leandrogaspar/work-at-olist-front?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/7560336c203482768061/maintainability)](https://codeclimate.com/github/leandrogaspar/work-at-olist-front/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7560336c203482768061/test_coverage)](https://codeclimate.com/github/leandrogaspar/work-at-olist-front/test_coverage)

# The Most Amazing New Account Form Ever Made
> Also (not)known as a simple Sign Up form using [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom) spec.

## Live demo

Want to see it in action? Go [here!](https://desolate-meadow-63118.herokuapp.com/).

## Server

The server code is in a separated repository. You can take a look [here](https://github.com/leandrogaspar/go-server).

## Getting started

### Installing

Download and install the latest LTS version of [node](https://nodejs.org/en/download/), open a shell and run: 

```shell
npm install
npm run build
```

You will find the build with all the needed files on the dist folder. After this you can either serve the files on a [HTTP server](https://github.com/leandrogaspar/go-server) or simply open the HTML with a browser.

### Tests

Right now there are only unit tests. You will need to have updated versions from both Chrome and Firefox for the dev-test script. The test will start the browsers in headless mode and will run everytime you update a file. If needed, you will find the coverage files on the base dir.

```shell
npm install
npm run dev-test
```

## Making a simple Component

### Components

Components are simple ES6 classes that extends the base Component class. This base class provide simple methods that make the implementation a little bit easier.

```js
/**
 * You can return your template as string here, think react render :)
 */
template() { return '<p>Amazing!</p>'; }

/**
 * Return your css as string here
 */
styles() { return 'p { color: blue; }'; }

/**
 * Invoked each time the template is connected to the template.
 */
onConnected() { console.log('How about setting some event listeners here, for click maybe?'); }

/**
 * Invoked each time the custom element is destroyed from the document's DOM.
 */
onDestroyed() { console.log(`Nice place to do some cleanup, don't you think?`); }
```

### The code

The HelloGuy component will receive a attribute "guy" and render it inside a h1 tag. The attribute must be returned on the list provided by the observedAttributes method to trigger a component render.

```js
//hello.js
import Component from '../component';

export default class HelloGuy extends Component {
  static get observedAttributes() { return ['guy'] }

  template() {
    return `<h1>Hello, ${this.guy}</h1>`;
  }

  get guy() { return this.getAttribute('guy'); }
}
customElements.define('hello-guy', HelloGuy);
```

You can now use your custom component by the tag configured on customElements.define.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Hello World!</title>
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.js"></script>
  <script src="hello.js"></script> <!-- The-->
</head>
<body>
  <hello-guy guy="Leandro"></hello-guy>
</body>
</html>
```
