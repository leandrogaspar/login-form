// Webpack entry point. Just import everything you need to put on the bundle here :)
import HelloWorld from '../../components/hello-world/hello-world';
import OlLogotype from '../../components/ol-logotype/ol-logotype';

// Copy the .html to dist
require('file-loader?name=[name].[ext]!./index.html');
