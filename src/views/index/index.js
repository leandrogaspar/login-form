// Webpack entry point. Just import everything you need to put on the bundle here :)
import OlLogotype from '../../components/ol-logotype/ol-logotype';
import OlInputText from '../../components/ol-input-text/ol-input-text';

// Copy the .html to dist
require('file-loader?name=[name].[ext]!./index.html');
