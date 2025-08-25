import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

const CustomTabs = ({ tabLabels, value, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: { xs: '8px 0', sm: '12px 0' },
        width: '100%',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          border: '1px solid #EAEAEA',
          borderRadius: '10px',
          padding: { xs: '4px 8px', sm: '6px 12px' },
          justifyContent: 'center',
        }}
      >
        {tabLabels.map((label, index) => (
          <Button
            key={index}
            variant={value === index ? 'contained' : 'outlined'}
            color={value === index ? 'primary' : 'inherit'}
            onClick={() => onChange(null, index)}
            sx={{
              padding: { xs: '4px 8px', sm: '6px 12px' },
              borderRadius: '4px',
              textTransform: 'uppercase',
              borderColor: value === index ? 'transparent' : '#EAEAEA',
              backgroundColor: value === index ? '#02042D' : 'transparent', // Changed to #02042D
              minWidth: { xs: '80px', sm: '100px' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 700,
                fontSize: { xs: '12px', sm: '13px' },
                lineHeight: '20px',
                color: value === index ? '#FFFFFF' : '#333333',
                letterSpacing: '0.5px',
              }}
            >
              {label}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

CustomTabs.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomTabs.defaultProps = {
  tabLabels: [],
};

export default CustomTabs;