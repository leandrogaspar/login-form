// Webpack entry point. Just import everything you need to put on the bundle here :)
import HelloWorld from '../../components/hello-world/hello-world';

// Copy the .html to dist
require('file-loader?name=[name].[ext]!./index.html');
