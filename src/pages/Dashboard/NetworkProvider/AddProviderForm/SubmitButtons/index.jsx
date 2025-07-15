import React from 'react';
import { Button, Typography,Box } from '@mui/material';

const SubmitButtons = ({ isCreating, onCancel }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isCreating}
                sx={{ minWidth: 150, height: 35, borderRadius: '10px', fontSize: 14, padding: '0 10px' }}
            >
                {isCreating ? 'Submitting...' : 'Add Provider'}
            </Button>
            <Typography
                onClick={onCancel}
                disabled={isCreating}
                sx={{ fontSize: 14, padding: '0 10px', cursor: 'pointer' }}
            >
                Cancel
            </Typography>
        </Box>
    );
};

export default SubmitButtons;