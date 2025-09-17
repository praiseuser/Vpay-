import React from 'react';
import { Box, TextField, Select, MenuItem, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fadeIn } from '../style';

const CustomInput = styled(Box)`
  flex: 1;
  max-width: 400px; /* Increased from 350px to 400px */
  animation: ${fadeIn} 0.5s ease-out;
`;

const InputField = ({ label, name, value, onChange, options, type = 'text', placeholder, isCheckbox = false, disabled = false }) => {
  if (isCheckbox) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 20, '&:last-child': { marginBottom: 0 } }}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={value === true}
              onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
              disabled={disabled}
              sx={{ p: 0.5 }}
            />
          }
          label={<Typography sx={{ fontSize: '0.85rem' }}>{label}</Typography>}
        />
      </Box>
    );
  }

  const isSelect = !!options;

return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 2 }}>
      <Typography
        sx={{
          fontFamily: 'Raleway',
          fontWeight: 600,
          fontSize: '16px',
          color: '#363853',
          minWidth: '100px',
        }}
      >
        {label}
      </Typography>
      <CustomInput>
        {isSelect ? (
          <Select
            name={name}
            value={value || ''}
            onChange={onChange}
            variant="outlined"
            disabled={disabled}
            sx={{
              width: '100%',
              backgroundColor: '#FAFAFA',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#FAFAFA',
                padding: '0 14px',
                '& fieldset': {
                  borderColor: value ? '#02042D' : '#D9D9D9',
                  borderWidth: '2px',
                  boxShadow: value ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                },
              },
              '& .MuiMenuItem-root': {
                color: '#000',
                fontSize: '14px',
              },
            }}
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            name={name}
            type={type}
            value={value || ''}
            onChange={onChange}
            variant="outlined"
            disabled={disabled}
            sx={{
              width: '100%',
              backgroundColor: '#FAFAFA',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#FAFAFA',
                '& fieldset': {
                  borderColor: value ? '#02042D' : '#D9D9D9',
                  borderWidth: '2px',
                  boxShadow: value ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                },
              },
            }}
            placeholder={placeholder}
            inputProps={{ min: type === 'number' ? 0.01 : undefined, step: type === 'number' ? '0.01' : undefined }}
          />
        )}
      </CustomInput>
    </Box>
  );
};

export default InputField;