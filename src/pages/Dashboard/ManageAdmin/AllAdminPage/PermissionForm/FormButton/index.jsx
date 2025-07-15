import React from 'react';
import { Button } from '@mui/material';

const FormButtons = ({ loading, onCancel }) => (
  <>
    <Button
      type="submit"
      variant="contained"
      sx={{ mt: 1, minWidth: 100, height: 35, borderRadius: '10px', fontSize: 14, padding: '0 10px' }}
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Add Permission'}
    </Button>

    {onCancel && (
      <Button
        onClick={onCancel}
        sx={{ mt: 1, minWidth: 100, height: 35, borderRadius: '10px', fontSize: 14, padding: '0 10px' }}
      >
        Cancel
      </Button>
    )}
  </>
);

export default FormButtons;