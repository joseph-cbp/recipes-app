import React from 'react';
import PropTypes from 'prop-types';

import logoFull from '../images/logo-full.png';
import logo from '../images/logo.png';
import logoText from '../images/logo-text.png';

export default function Logo({ full = false, text = false }) {
  return (
    <div>
      <img src={ full ? logoFull : logo } alt="logo" />
      {text && <img src={ logoText } alt="recipes app" className="mx-3" />}
    </div>
  );
}

Logo.propTypes = {
  full: PropTypes.bool,
  text: PropTypes.bool,
};
