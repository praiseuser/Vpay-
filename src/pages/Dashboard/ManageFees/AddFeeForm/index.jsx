import React, { useRef } from 'react';
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCreateFeeCurrency } from '../../../../Hooks/useFeeCurrency';

const FormContainer = styled('form')({  // ← use 'form' not 'div'
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '24px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)({
    marginTop: '10px',
});

const AddFeeForm = ({ formData, setFormData, handleCreateFee, handleCancel }) => {
    const { createFiatCurrency, loading, error, success } = useCreateFeeCurrency();
    const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
    const VALID_FEE_TYPES = ['percentage', 'fixed'];
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : name === 'fee_amount' || name === 'max_limit'
                        ? Number(value)
                        : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            fee_name: formData.fee_name || '',
            fee_type: formData.fee_type || '',
            fee_amount: Number(formData.fee_amount) || 0,
            status: Boolean(formData.status),
            has_max_limit: Boolean(formData.has_max_limit),
            max_limit: formData.has_max_limit ? Number(formData.max_limit) || 0 : null,
        };
        await createFiatCurrency(payload);
        if (success && !error) {
            handleCreateFee();
        }
    };

    const handleAddFeeClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit} ref={formRef}>
            <Typography variant="h6" align="center">Add New Fee</Typography>

            {error && <Typography color="error" align="center">{error}</Typography>}
            {success && <Typography color="success.main" align="center">Fee created successfully!</Typography>}

            <FormControl fullWidth required>
                <InputLabel>Fee Name</InputLabel>
                <Select
                    name="fee_name"
                    value={formData.fee_name || ''}
                    onChange={handleChange}
                    disabled={loading}
                    label="Fee Name"
                >
                    <MenuItem value=""><em>Select Fee Name</em></MenuItem>
                    {VALID_FEE_NAMES.map((name) => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth required>
                <InputLabel>Fee Type</InputLabel>
                <Select
                    name="fee_type"
                    value={formData.fee_type || ''}
                    onChange={handleChange}
                    disabled={loading}
                    label="Fee Type"
                >
                    <MenuItem value=""><em>Select Fee Type</em></MenuItem>
                    {VALID_FEE_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Fee Amount"
                name="fee_amount"
                type="number"
                inputProps={{ min: 0.01, step: '0.01' }}
                helperText={formData.fee_type === 'percentage' ? 'Enter percentage (e.g., 1.5)' : 'Enter fixed amount'}
                value={formData.fee_amount || ''}
                onChange={handleChange}
                disabled={loading}
                required
                fullWidth
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="status"
                        checked={!!formData.status}
                        onChange={handleChange}
                        disabled={loading}
                    />
                }
                label="Enabled"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="has_max_limit"
                        checked={!!formData.has_max_limit}
                        onChange={handleChange}
                        disabled={loading}
                    />
                }
                label="Has Max Limit"
            />

            {formData.has_max_limit && (
                <TextField
                    label="Max Limit"
                    name="max_limit"
                    type="number"
                    inputProps={{ min: 0.01, step: '0.01' }}
                    value={formData.max_limit || ''}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    fullWidth
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <StyledButton variant="outlined" onClick={handleCancel} disabled={loading}>
                    Cancel
                </StyledButton>
                <StyledButton
                    variant="contained"
                    onClick={handleAddFeeClick}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Adding...' : 'Add Fee'}
                </StyledButton>
            </div>
        </FormContainer>
    );
};

export default AddFeeForm;
