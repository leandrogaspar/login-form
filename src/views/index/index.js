// Webpack entry point. Just import everything you need to put on the bundle here :)
import LfNewAccount from '../../components/lf-new-account';
import LfButton from '../../components/lf-button';
import LfInputText from '../../components/lf-input-text';
import LfPasswordStrength from '../../components/lf-password-strength';
import LfLogotype from '../../components/lf-logotype';
import LfOkIcon from '../../components/lf-ok-icon';
import LfSuccessMessage from '../../components/lf-success-message';

// Copy the .html to dist
require('file-loader?name=[name].[ext]!./index.html');
