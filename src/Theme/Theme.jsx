import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#208BC9',
    },
    success: {
      main: '#009512',
    },
    error: {
      main: '#F7366A',
    },
  },
  typography: {
    fontFamily: 'Mada, sans-serif',
  },
});

export default theme;
