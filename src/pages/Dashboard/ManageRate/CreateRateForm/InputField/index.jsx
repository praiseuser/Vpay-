import React from 'react';
import { Box, TextField, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CustomInput = styled(Box)`
  flex: 1;
  max-width: 350px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const InputField = ({ label, name, value, onChange, options, type = 'text', placeholder }) => {
  const isSelect = !!options;

return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 2, '&:last-child': { marginBottom: 0 } }}>
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
                    value={value}
                    onChange={onChange}
                    variant="outlined"
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
                            },
                        },
                        '& .MuiMenuItem-root': {
                            color: '#000',
                            fontSize: '14px',
                        },
                    }}
                >
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
                    value={value}
                    onChange={onChange}
                    variant="outlined"
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
                            },
                        },
                    }}
                    placeholder={placeholder}
                />
            )}
        </CustomInput>
    </Box>
);
};

export default InputField;