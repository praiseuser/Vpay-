import React from 'react';
import {
    Modal,
    Box,
    Typography,
} from '@mui/material';

const EditFiatStatusModal = ({ open, onClose, fiatData }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-fiat-status-modal"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    bgcolor: 'white',
                    borderRadius: '16px',
                    p: 3,
                    boxShadow: 24,
                }}
            >
                <Typography
                    id="edit-fiat-status-modal"
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '20px',
                        color: '#4A85F6',
                        mb: 2,
                    }}
                >
                    Edit Status for {fiatData?.Fiat_Currency}
                </Typography>

                <Box sx={{ mb: 3 }}>
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
                    <Typography>
                        {fiatData?.status === 1 ? 'Enabled' : 'Disabled'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Typography
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            color: '#73757C',
                            cursor: 'pointer',
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: '700',
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            color: '#FFFFFF',
                            backgroundColor: '#208BC9',
                            borderRadius: '10px',
                            padding: '10px 30px',
                            display: 'inline-block',
                            textAlign: 'center',
                        }}
                    >
                        Save
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditFiatStatusModal;