import React from 'react';
import { Button, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';

const CustomButton = ({
  type = 'edit',
  onClick,
  color = '#208BC9',
  text = 'Edit',
  iconColor = 'white',
  icon = true,
  loading = false,
}) => {
  const buttonStyles = {
    width: type === 'add' ? '119px' : type === 'permission' ? '100px' : '83px', 
    height: type === 'add' ? '40px' : type === 'permission' ? '32px' : '32px',
    borderRadius: type === 'green' || type === 'red' ? '20px' : '10px',
    backgroundColor:
      type === 'green' ? '#B4FBBD' :
      type === 'red' ? '#FFB4B4' :
      type === 'view' ? '#FF0000' :
      type === 'permission' ? '#208BC9' :
      color,
    border:
      type === 'green' ? '1px solid #009512' :
      type === 'red' ? '1px solid #950000' :
      'none',
    fontFamily: type === 'green' || type === 'red' ? '"Raleway", sans-serif' : '"Inter", sans-serif',
    fontWeight: type === 'green' || type === 'red' ? 500 : type === 'add' ? 800 : 700,
    fontSize: 
      type === 'delete' ? '9px' :
      type === 'green' || type === 'red' ? '12px' : 
      type === 'add' ? '22px' : '10px',
    lineHeight: type === 'green' || type === 'red' ? '16px' : type === 'add' ? '54px' : '100%',
    letterSpacing: type === 'green' || type === 'red' ? '0.3%' : 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    color:
      type === 'green' ? '#009512' :
      type === 'red' ? '#950000' :
      type === 'permission' ? '#333333' :
      '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor:
        type === 'green' ? '#B4FBBD' :
        type === 'red' ? '#FFB4B4' :
        type === 'view' ? '#FF0000' :
        color,
    },
    '&:disabled': {
      backgroundColor: 
        type === 'delete' ? '#FFB4B4' :
        type === 'view' ? '#FF0000' :
        type === 'permission' ? '#FFD700' : 
        color,
      color: '#fff',
      opacity: 0.6,
    },
  };

  const chipStyles = {
    height: '25px',
    borderRadius: '20px',
    backgroundColor:
      type === 'green' ? '#B4FBBD' :
      type === 'red' ? '#FFB4B4' :
      color,
    border:
      type === 'green' ? '1px solid #009512' :
      type === 'red' ? '1px solid #950000' :
      'none',
    fontFamily: '"Raleway", sans-serif',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.3%',
    color:
      type === 'green' ? '#009512' :
      type === 'red' ? '#950000' :
      '#fff',
    '&:hover': {
      backgroundColor:
        type === 'green' ? '#B4FBBD' :
        type === 'red' ? '#FFB4B4' :
        color,
    },
  };

  const renderIcon = () => {
    if (type === 'add' && icon) {
      return <AddIcon sx={{ color: iconColor }} />;
    } else if (type === 'delete' && icon) {
      return loading ? (
        <CircularProgress size={16} sx={{ color: iconColor }} />
      ) : (
        <DeleteIcon sx={{ color: iconColor, fontSize: '16px' }} />
      );
    } else if (type === 'view' && icon) {
      return loading ? (
        <CircularProgress size={16} sx={{ color: iconColor }} />
      ) : (
        <VisibilityIcon sx={{ color: iconColor, fontSize: '16px' }} />
      );
    } else if (type === 'permission' && icon) {
      return loading ? (
        <CircularProgress size={16} sx={{ color: iconColor }} />
      ) : (
        <LockIcon sx={{ color: iconColor, fontSize: '16px' }} />
      );
    }
    return null;
  };

  const renderText = () => {
    switch (type) {
      case 'edit':
        return 'Edit';
      case 'disable':
        return 'Disable';
      case 'green':
        return 'Enabled';
      case 'red':
        return 'Disabled';
      case 'add':
        return text;
      case 'delete':
        return 'Delete';
      case 'view':
        return 'View';
      case 'permission':
        return 'Permission';
      default:
        return text;
    }
  };

  return (
    <>
      {type === 'green' || type === 'red' ? (
        <Chip
          label={renderText()}
          sx={chipStyles}
          onClick={onClick}
          clickable
          disabled={loading}
        />
      ) : (
        <Button
          onClick={onClick}
          sx={buttonStyles}
          disabled={loading}
        >
          {renderText()} {renderIcon()}
        </Button>
      )}
    </>
  );
};

export default CustomButton;