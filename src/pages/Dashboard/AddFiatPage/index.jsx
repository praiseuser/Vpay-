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
import { useCreateFiatCurrency } from '../../../Hooks/useFiatCurrency';

const AddFiatPage = ({ onCancel }) => {
    const [fiatCurrency, setFiatCurrency] = useState('');
    const [status, setStatus] = useState(1);
    const { createFiatCurrency, loading, error, success } = useCreateFiatCurrency();

    const handleSubmit = async () => {
        if (!fiatCurrency.trim()) {
            alert("Please enter a Fiat Currency.");
            return;
        }

        const fiatData = {
            fiat_currency: fiatCurrency,
            status: status,
        };

        console.log("Data before sending to hook:", fiatData);

        await createFiatCurrency(fiatData);

        if (success) {
            setFiatCurrency('');
            setStatus(1);
            onCancel();
        } else if (error) {
            alert(error);
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 1070,
                mx: 'auto',
                mt: 4,
                height: 'auto',
                px: 2,
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
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 6,
                        px: { xs: 0, sm: 4 },
                        gap: { xs: 2, md: 4 },
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
                            Fiat Currency
                        </Typography>
                        <TextField
                            value={fiatCurrency}
                            onChange={(e) => setFiatCurrency(e.target.value)}
                            variant="outlined"
                            placeholder="Enter Fiat Currency (e.g., NGN)"
                            sx={{
                                width: '100%',
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
                            disabled={loading}
                        />
                    </Box>

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
                            Status
                        </Typography>
                        <TextField
                            select
                            value={status}
                            onChange={(e) => setStatus(parseInt(e.target.value))}
                            variant="outlined"
                            sx={{
                                width: '100%',
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
                            disabled={loading}
                        >
                            <MenuItem value={1}>Enabled</MenuItem>
                            <MenuItem value={0}>Disabled</MenuItem>
                        </TextField>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 2,
                        mt: 4,
                        px: { xs: 0, sm: 4 },
                    }}
                >
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
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            borderRadius: '10px',
                            backgroundColor: '#208BC9',
                            padding: '10px 30px',
                            boxShadow: 'none',
                            opacity: loading ? 0.6 : 1,
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
                            {loading ? 'Adding...' : 'Add Fiat'}
                        </Typography>
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddFiatPage;