/**
 * University of Iowa Logo component.
 */

import { IconType } from 'office-ui-fabric-react';
import PNG          from './uiowa-yellow.png';

const Logo = {
  key      : 'logo',
  name     : '',
  disabled : true,
  iconOnly : true,
  className: 'NavLogo',
  iconProps: {
    iconType  : IconType.Image,
    imageProps: {
      className: 'NavLogo',
      src      : PNG,
      height   : 33
    }
  }
};

export default Logo;