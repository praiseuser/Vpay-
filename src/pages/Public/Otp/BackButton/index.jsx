import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ sx }) => {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate('/')} sx={sx}>
      <ArrowBackIcon sx={{ fontSize: 20 }} />
    </IconButton>
  );
};

export default BackButton;
