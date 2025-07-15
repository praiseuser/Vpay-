import React from 'react';
import PropTypes from 'prop-types';
import { Typography, CircularProgress } from '@mui/material';

const LoadingErrorDisplay = ({ loading, error }) => {
    if (loading) {
        return (
            <Typography sx={{ mb: 2, textAlign: 'center' }}>
                <CircularProgress size={24} />
            </Typography>
        );
    }
    if (error) {
        return (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {error}
            </Typography>
        );
    }
    return null;
};

LoadingErrorDisplay.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default LoadingErrorDisplay;