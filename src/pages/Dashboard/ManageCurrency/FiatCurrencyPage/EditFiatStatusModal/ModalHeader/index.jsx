import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { titleStyle } from '../fiatModalStyles';


const ModalHeader = ({ fiatCurrency }) => (
  <Typography id="edit-fiat-status-modal" sx={titleStyle}>
    Edit Status for {fiatCurrency}
  </Typography>
);

ModalHeader.propTypes = {
  fiatCurrency: PropTypes.string,
};

ModalHeader.defaultProps = {
  fiatCurrency: '',
};

export default ModalHeader;