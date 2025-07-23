import { Box, CircularProgress, Chip } from '@mui/material';
import { rowStyle } from '../fiatStyles';
import CustomButton from '../../../../../components/CustomButton';

const formatRows = (data, handleEditClick, loading) => {
  if (loading && data.length === 0) {
    return [
      {
        sn: '',
        fiat_currency_name: (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60px',
              width: '100%',
              padding: 0,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        ),
        fiat_currency_code: '',
        status: '',
        action: '',
      },
    ];
  }

  if (data.length === 0) {
    return [];
  }

  return data.map((item, index) => ({
    sn: <span style={{ ...rowStyle }}>{index + 1}</span>,
    fiat_currency_name: (
      <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>
        {item.fiat_currency_name}
      </span>
    ),
    fiat_currency_code: (
      <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>
        {item.fiat_currency_code}
      </span>
    ),
    status: (
      <Chip
        label={item.status === '1' || item.status === 1 ? 'Enabled' : 'Disabled'}
        color={item.status === '1' || item.status === 1 ? 'success' : 'default'}
        variant="outlined"
        size="small"
        sx={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}
      />
    ),
    action: (
      <Box style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" onClick={() => handleEditClick(item)} />
      </Box>
    ),
  }));
};

export { formatRows };
