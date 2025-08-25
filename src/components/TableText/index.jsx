import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const TableText = ({ children, variant = 'body2', ...props }) => {
  return (
    <Typography
      variant={variant}
      sx={{
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
        color: 'grey',
        fontWeight: 300,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

TableText.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

TableText.defaultProps = {
  variant: 'body2',
};

export default TableText;