import { Box, Typography } from '@mui/material';

const ErrorDisplay = ({ error }) => {
    return error ? (
        <Box sx={{ p: 2, textAlign: 'center', color: '#dc3545' }}>
            <Typography>{error}</Typography>
        </Box>
    ) : null;
};

export default ErrorDisplay;