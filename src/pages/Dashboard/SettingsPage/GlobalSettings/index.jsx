import React from 'react';
import { Box, Card, Typography, TextField } from '@mui/material';
import { Globe } from 'lucide-react';

const GlobalSettings = ({ cardStyles, headerBarStyles, sectionTitleStyles, labelStyles, selectStyles, menuPropsStyles, settings, setSettings }) => {
  const handleCurrencyChange = (e) => {
    setSettings((prev) => ({ ...prev, currency: e.target.value }));
  };

  const handleFeeRateChange = (e) => {
    setSettings((prev) => ({ ...prev, feeRate: e.target.value }));
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={headerBarStyles} />
      <Typography sx={sectionTitleStyles}>
        <Globe size={20} /> Global Settings
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>Default Currency</Typography>
        <TextField
          select
          value={settings.currency}
          onChange={handleCurrencyChange}
          sx={selectStyles}
          SelectProps={{ MenuProps: menuPropsStyles }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </TextField>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>Default Fee Rate (%)</Typography>
        <TextField
          type="number"
          value={settings.feeRate}
          onChange={handleFeeRateChange}
          sx={{ ...selectStyles, width: '200px' }}
        />
      </Box>
    </Card>
  );
};

export default GlobalSettings;