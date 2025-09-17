import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ActionButtons = ({ loading, onClose, onSubmit }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
      <Button variant="outlined" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant="contained" onClick={onSubmit} disabled={loading}>
        Submit
      </Button>
    </Box>
  );
};

ActionButtons.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ActionButtons;