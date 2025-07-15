import React from 'react';
import PropTypes from 'prop-types';
import { errorMessageStyle } from '../countryStyles';


const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return <div style={errorMessageStyle}>Error: {error}</div>;
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: '',
};

export default ErrorMessage;