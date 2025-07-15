const formContainerStyle = {
  width: '100%',
  margin: '0 auto',
  mt: 7,
  p: 3,
  border: '2px solid #E0E0E0',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  background: 'white',

  position: 'relative',
};

const formFieldsStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 2.5,
  width: '100%',
  height: 'auto',
};

const titleStyle = {
  fontFamily: 'Mada, sans-serif',
  fontWeight: 700,
  textAlign: 'left',
  fontSize: '16px',
  mb: 2,
  color: '#2E3B55',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-6px',
    left: 0,
    width: '40px',
    height: '2px',
    backgroundColor: '#02042D',
  },
};

const imagePreviewStyle = {
  mb: 1.5,
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  '& img': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

const imageStyle = {
  width: 80,
  height: 50,
  borderRadius: 8,
  mt: 0.5,
  border: '2px solid #02042D',
};

const errorStyle = {
  color: '#D32F2F',
  fontSize: '14px',
  mb: 1.5,
  fontFamily: 'Mada, sans-serif',
  fontWeight: 600,
};

const actionsContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2.5,
  gap: 1.5,
};

const cancelButtonStyle = {
  fontSize: '14px',
  padding: '8px 20px',
  backgroundColor: '#E0E0E0',
  color: '#2E3B55',
  '&:hover': {
    backgroundColor: '#B0BEC5',
  },
  fontFamily: 'Mada, sans-serif',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
};

const submitButtonStyle = {
  fontSize: '14px',
  padding: '8px 24px',
  background: 'linear-gradient(90deg, #1976d2, #42A5F5)',
  '&:hover': {
    background: 'linear-gradient(90deg, #1565c0, #2196F3)',
  },
  fontFamily: 'Mada, sans-serif',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
  color: '#FFFFFF',
};

const inputFieldStyle = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    width: '100%',
    height: '48px',
    '& fieldset': {
      borderColor: 'grey',
      borderWidth: '1px',
      borderRadius: 3,
    },

  },

};

export {
  formContainerStyle,
  formFieldsStyle,
  titleStyle,
  imagePreviewStyle,
  imageStyle,
  errorStyle,
  actionsContainerStyle,
  cancelButtonStyle,
  submitButtonStyle,
  inputFieldStyle,
};