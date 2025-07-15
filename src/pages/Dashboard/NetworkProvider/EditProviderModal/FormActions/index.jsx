import { Button, Typography, Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';

const FormActions = ({ loading, onClose }) => (
  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : null}
      sx={{ minWidth: 100, height: 35, borderRadius: '10px', fontSize: 14, padding: '0 10px', fontFamily: 'Inter' }}
    >
      Update Provider
    </Button>
    <Typography
      onClick={onClose}
      sx={{ fontFamily: 'Inter', fontSize: 14, padding: '0 10px', cursor: 'pointer', color: '#555' }}
      disabled={loading}
    >
      Cancel
    </Typography>
  </Grid>
);

export default FormActions;