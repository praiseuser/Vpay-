import { Box } from '@mui/material';
import { rowStyle } from '../cryptoStyles';
import CustomButton from '../../../../../components/CustomButton';
import TableText from '../../../../../components/TableText';
import CustomLoader from '../../../../../components/CustomLoader';
import { BASE_IMAGE_URL } from '../../../../../utilities/constants';

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

  return data.map((item, index) => {
    const imageSrc = item.crypto_image
      ? `${BASE_IMAGE_URL}${item.crypto_image}`
      : '';

    return {
      serial: <TableText style={rowStyle}>{index + 1}</TableText>,
      crypto_name: <TableText style={rowStyle}>{item.crypto_name}</TableText>,
      network: <TableText style={rowStyle}>{item.network}</TableText>,
      crypto_symbol: (
        <TableText style={rowStyle}>{item.crypto_symbol || 'N/A'}</TableText>
      ),
      chain: <TableText style={rowStyle}>{item.chain || 'N/A'}</TableText>,
      crypto_image: (
        <Box style={rowStyle}>
          {item.crypto_image ? (
            <img
              src={imageSrc}
              alt={item.crypto_name}
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              onError={(e) => {
                e.target.src = ''; // fallback if image fails to load
              }}
            />
          ) : (
            <TableText>N/A</TableText>
          )}
        </Box>
      ),
      status: <CustomButton type={item.status === '1' ? 'green' : 'red'} />,
      action: (
        <Box
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
          }}
        >
          <CustomButton type="edit" onClick={() => onEditClick(item)} />
          <CustomButton type="disable" />
        </Box>
      ),
    };
  });

};

export { formatRows };
