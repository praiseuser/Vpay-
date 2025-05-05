import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const DashboardNavigLink = styled(Link)(({ isactive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textDecoration: 'none',
  width: '200px',
  height: '48px',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '12px',
  fontWeight: 400,
  color: '#888B93',
  marginLeft: '9px',
  ...(isactive == 1 && {
    color: '#D9D9D9',
    backgroundColor: '#208BC9',
    fontWeight: 500,
    justifyContent: 'center',
  }),
}));

export default DashboardNavigLink;