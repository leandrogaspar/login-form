// Webpack entry point. Just import everything you need to put on the bundle here :)
import HelloWorld from '../../components/hello-world/hello-world.js'

require('file-loader?name=[name].[ext]!./index.html')