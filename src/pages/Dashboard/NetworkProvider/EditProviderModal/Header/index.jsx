import { Typography, Box } from '@mui/material';

const Header = () => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pl: 2 }}>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Mada',
        fontWeight: 500,
        fontSize: '25px',
        marginLeft: '20px'
      }}
    >
      Edit Provider
    </Typography>
  </Box>
);

export default Header;