const pageStyles = {
  p: 3,
  backgroundColor: 'white',
  minHeight: '100vh',
  width: '100%',
};

const titleStyles = {
  fontFamily: 'Mada',
  fontSize: '28px',
  color: '#02042D',
  mb: 4,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '50px',
    height: '4px',
    background: 'linear-gradient(90deg, #02042D, #42A5F5)',
  },
};

const cardStyles = {
  p: 3,
  borderRadius: '16px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  mb: 3,
  position: 'relative',
  animation: 'fadeIn 0.5s ease-in',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

const headerBarStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '6px',
  background: 'linear-gradient(90deg, #02042D, #42A5F5)',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
};

const sectionTitleStyles = {
  fontFamily: 'Mada',
  fontSize: '16px',
  color: '#02042D',
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    mr: 1,
    color: '#42A5F5',
  },
};

const labelStyles = {
  fontFamily: 'Inter',
  fontSize: '14px',
  color: '#666',
  mb: 1,
};

const textFieldStyles = {
  width: '300px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    fontFamily: 'Inter',
    fontSize: '14px',
    color: '#02042D',
  },
};

const buttonStyles = {
  contained: {
    backgroundColor: '#02042D',
    color: 'white',
    fontFamily: 'Inter',
    fontSize: '14px',
    textTransform: 'none',
    borderRadius: '8px',
    px: 4,
    py: 1,
    '&:hover': {
      backgroundColor: '#02042D',
      opacity: 0.9,
    },
  },
};

export {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles,
  labelStyles,
  textFieldStyles,
  buttonStyles,
};