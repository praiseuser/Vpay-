import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Divider,
    TextField,
    MenuItem,
    Button,
} from '@mui/material';

const AddFiatPage = ({ onCancel }) => {
    const [roleName, setRoleName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 1070,
                mx: 'auto',
                mt: 4,
                height: 'auto',
                px: 2, // Padding for small screens
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    height: '100%',
                    border: '2px solid #DCE7EC',
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '24px',
                        color: '#4A85F6',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        marginTop: '30px',
                        marginLeft: '30px',
                    }}
                >
                    Add FIAT
                </Typography>

                <Divider
                    sx={{
                        borderBottom: '2px solid #D9D9D9',
                        mt: '30px',
                        mx: '-24px',
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 6,
                        px: { xs: 0, sm: 4 },
                        gap: { xs: 2, md: 4 }, // Add gap between columns on larger screens
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', sm: '45%' } }}>
                        <Typography
                            sx={{
                                fontFamily: 'Raleway',
                                fontWeight: 600,
                                fontSize: '14px',
                                color: '#363853',
                                mb: '8px',
                            }}
                        >
                            Select FIAT Currency
                        </Typography>
                        <TextField
                            select
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            variant="outlined"
                            placeholder="Choose..."
                            sx={{
                                width: '100%', // Full width on smaller screens
                                maxWidth: '261px',
                                height: '40px',
                                backgroundColor: '#FAFAFA',
                                borderRadius: '10px',
                                '& .MuiOutlinedInput-root': {
                                    height: '40px',
                                    borderRadius: '10px',
                                    backgroundColor: '#FAFAFA',
                                    '& fieldset': {
                                        borderColor: '#D9D9D9',
                                        borderWidth: '1px',
                                    },
                                },
                            }}
                        >
                            <MenuItem value="Option 1">US Dollar (USD)</MenuItem>
                            <MenuItem value="Option 2">Uganda (UGX)</MenuItem>
                            <MenuItem value="Option 3">Nigeria Naira (NGN)</MenuItem>
                        </TextField>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: '45%' } }}>
                        <Typography
                            sx={{
                                fontFamily: 'Inter',
                                fontWeight: 700,
                                fontSize: '12px',
                                lineHeight: '100%',
                                letterSpacing: '0%',
                                textAlign: 'center',
                                textTransform: 'capitalize',
                                color: '#73757C',
                                cursor: 'pointer',
                            }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                fontFamily: 'Inter',
                                fontWeight: 700,
                                fontSize: '12px',
                                textTransform: 'capitalize',
                                borderRadius: '10px',
                                backgroundColor: '#208BC9',
                                padding: '10px 30px',
                                boxShadow: 'none',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Inter',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                    color: '#FFFFFF',
                                }}
                            >
                                Add Fiat
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddFiatPage;
