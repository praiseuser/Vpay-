const formContainerStyle = {
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  mt: 4,
  p: 3,
  border: '1px solid #E5E7EB',
  borderRadius: 12,
  background: '#FFFFFF',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
};

const formFieldsStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 1.5,
  width: '100%',
};

const titleStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  textAlign: 'left',
  fontSize: '18px',
  mb: 2,
  color: '#1E3A8A',
};

const imagePreviewStyle = {
  mb: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  '& img': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

const imageStyle = {
  width: 60,
  height: 40,
  borderRadius: 6,
  border: '1px solid #D1D5DB',
};

const errorStyle = {
  color: '#DC2626',
  fontSize: '12px',
  mb: 1.5,
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 500,
};

const actionsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 2,
};

const cancelButtonStyle = {
  fontSize: '14px',
  padding: '6px 16px',
  color: '#6B7280',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 500,
  borderRadius: 8,
  textTransform: 'none',
};

const submitButtonStyle = {
  fontSize: '14px',
  padding: '8px 20px',
  background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
  color: '#FFFFFF',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  borderRadius: 12,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #2563EB, #3B82F6)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
};

const inputFieldStyle = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    '& fieldset': {
      borderColor: '#D1D5DB',
      borderWidth: '1px',
      borderRadius: 6,
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