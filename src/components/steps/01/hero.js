import React from 'react';

const Hero = () => {
  const hero_styles = {
    'fontWeight'   : '900',
    'fontFamily'   : 'monospace',
    'fontSize'     : '120px',
    'lineHeight'   : '0.75',
    'letterSpacing': '12px',
    'wordSpacing'  : '0',
    'marginTop'    : '-0em',
    'marginBottom' : '50px !important',
    'float'        : 'right'
  };
  return (
    <span style={hero_styles}>
      CO<br/>PH
    </span>
  );
}

export default Hero;