import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const DashboardNavigLink = styled(Link)(({ isactive, collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  width: collapsed ? '100%' : '200px', // Flexible width in collapsed state
  height: collapsed ? '48px' : '32px', // Match parent Box height
  borderRadius: '8px',
  padding: collapsed ? '0' : '0 8px', // Remove padding in collapsed state
  fontWeight: 500,
  color: '#888B93',
  ...(isactive == 1 && {
    color: '#D9D9D9',
    backgroundColor: '#1e7bb7',
    fontWeight: 500,
    maxWidth: collapsed ? '80px' : '170px', // Adjust maxWidth for collapsed state
    '& svg': {
      color: '#fff',
    },
  }),
}));

export default DashboardNavigLink;