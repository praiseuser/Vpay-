import { Box, Switch, Typography } from '@mui/material';
import { useUpdateNetwork } from '../../Hooks/useNetwork';

const NetworkSwitch = () => {
  const { network, loading, error, updateNetwork } = useUpdateNetwork();

  const handleNetworkToggle = async (event) => {
    const newNetwork = event.target.checked ? 'testnet' : 'mainnet';
    await updateNetwork(newNetwork); 
  };

  if (error) console.error('Network Switch Error:', error); 

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
      <Switch
        checked={network === 'testnet'} 
        onChange={handleNetworkToggle}
        color="primary"
        sx={{ m: 0, p: 0 }}
        disabled={loading} 
      />
      <Typography sx={{ ml: 1, fontFamily: 'Mada, sans-serif', color: '#0C0B18', fontSize: '14px' }}>
        {network.charAt(0).toUpperCase() + network.slice(1)} 
      </Typography>
    </Box>
  );
};

export default NetworkSwitch;