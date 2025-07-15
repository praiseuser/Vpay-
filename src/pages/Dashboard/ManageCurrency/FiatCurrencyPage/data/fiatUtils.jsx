import { Box, CircularProgress } from '@mui/material';
import { rowStyle } from '../fiatStyles';
import CustomButton from '../../../../../components/CustomButton';


const formatRows = (data, handleEditClick, loading) => {
  if (loading && data.length === 0) {
    return [
      {
        Fiat_Currency: (
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
        status: '',
        action: '',
      },
    ];
  }

  if (data.length === 0) {
    return [];
  }

  return data.map((item) => {
    const buttonType = item.status === 1 ? 'green' : 'red';
    return {
      Fiat_Currency: (
        <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>
          {item.Fiat_Currency}
        </span>
      ),
      status: <CustomButton type={buttonType} />,
      action: (
        <Box style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <CustomButton type="edit" onClick={() => handleEditClick(item)} />
        </Box>
      ),
    };
  });
};

export { formatRows };