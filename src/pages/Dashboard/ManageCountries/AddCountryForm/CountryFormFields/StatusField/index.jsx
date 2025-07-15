import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { inputFieldStyle } from '../../countryFormStyles';

const StatusField = ({ value, onChange, statusOptions, required }) => {
    const safeStatusOptions = statusOptions || [];


    return (
        <TextField
            select
            label="Status"
            fullWidth
            value={value}
            onChange={onChange}
            required={required}
            sx={inputFieldStyle}
        >
            {safeStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

StatusField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    statusOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    required: PropTypes.bool,
};

export default StatusField;