// Webpack entry point. Just import everything you need to put on the bundle here :)
import OlNewAccount from '../../components/ol-new-account'
import OlButton from '../../components/ol-button';
import OlInputText from '../../components/ol-input-text';
import OlPasswordStrength from '../../components/ol-password-strength';
import OlLogotype from '../../components/ol-logotype';

// Copy the .html to dist
require('file-loader?name=[name].[ext]!./index.html');
