import { Box } from '@mui/material';
import { rowStyle } from '../cryptoStyles';
import CustomButton from '../../../../../components/CustomButton';
import TableText from '../../../../../components/TableText';
import CustomLoader from '../../../../../components/CustomLoader';

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
              minHeight: '20px',
              width: '100%',
              padding: 0,
              marginTop: '13px',
            }}
          >
            <CustomLoader />
          </Box>
        ),
        network: '',
        crypto_symbol: '',
        chain: '',
        crypto_image: '',
        status: '',
        action: '',
      },
    ];
  }

  if (data.length === 0) {
    return [];
  }

  return data.map((item) => ({
    crypto_name: <TableText style={rowStyle}>{item.crypto_name}</TableText>,
    network: <TableText style={rowStyle}>{item.network}</TableText>,
    crypto_symbol: <TableText style={rowStyle}>{item.crypto_symbol || 'N/A'}</TableText>,
    chain: <TableText style={rowStyle}>{item.chain || 'N/A'}</TableText>,
    crypto_image: (
      <Box style={rowStyle}>
        {item.crypto_image ? (
          <img
            src={item.crypto_image}
            alt={item.crypto_name}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            onError={(e) => {
              e.target.src = '';
              console.log('Image load error for:', item.crypto_image);
            }}
          />
        ) : (
          <TableText>N/A</TableText>
        )}
      </Box>
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