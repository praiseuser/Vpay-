import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const EditRateModal = ({ open, onClose, rateData }) => {
    const [formData, setFormData] = useState({
        currency_id: '',
        rate: '',
        status: '',
    });

    // Reset form when rateData changes
    useEffect(() => {
        if (rateData) {
            setFormData({
                currency_id: rateData.currency_id || '',
                rate: rateData.rate || '',
                status: rateData.status?.toString() || '0',
            });
        }
    }, [rateData]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setFormData({ currency_id: '', rate: '', status: '' });
        }
    }, [open]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Stub submit handler (no update logic)
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add any onSubmit logic here or pass formData up via props
        console.log('Form submitted:', formData);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-rate-modal"
            aria-describedby="edit-rate-form"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Edit Rate
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Currency ID"
                        name="currency_id"
                        value={formData.currency_id}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled
                    />

                    <TextField
                        label="Rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ step: 'any' }}
                    />

                    <TextField
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        fullWidth
                        margin="normal"
                        required
                    >
                        <option value="1">Enabled</option>
                        <option value="0">Disabled</option>
                    </TextField>

                    <Box
                        sx={{
                            mt: 3,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Button onClick={onClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>

                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditRateModal;
