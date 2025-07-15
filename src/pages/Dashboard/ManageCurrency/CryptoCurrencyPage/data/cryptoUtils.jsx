import { Box, CircularProgress } from '@mui/material';
import { rowStyle } from '../cryptoStyles';
import CustomButton from '../../../../../components/CustomButton';


const formatRows = (data, onEditClick, loading) => {
  if (loading && data.length === 0) {
    return [
      {
        crypto_name: (
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
        network: '',
        status: '',
        action: '',
      },
    ];
  }

  if (data.length === 0) {
    return [];
  }

  return data.map((item) => ({
    crypto_name: (
      <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>
        {item.crypto_name}
      </span>
    ),
    network: (
      <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>
        {item.network}
      </span>
    ),
    status: <CustomButton type={item.status === '1' ? 'green' : 'red'} />,
    action: (
      <Box style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" onClick={() => onEditClick(item)} />
        <CustomButton type="disable" />
      </Box>
    ),
  }));
};

export { formatRows };