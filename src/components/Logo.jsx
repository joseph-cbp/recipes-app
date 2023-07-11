import React from 'react';
import PropTypes from 'prop-types';

import logoFull from '../images/logo-full.png';
import logo from '../images/logo.png';

export default function Logo({ full = false }) {
  return (
    <img src={ full ? logoFull : logo } alt="logo" />
  );
}

Logo.propTypes = {
  full: PropTypes.bool.isRequired,
};
