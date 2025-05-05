const cardStyles = {
    p: 3,
    height: 'auto',
    maxWidth: '900px',
    width: '100%',
    borderRadius: '16px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };
  
  const logsCardStyles = {
    p: 3,
    height: 'auto',
    maxWidth: '600px',
    width: '100%',
    borderRadius: '16px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };
  
  const statusDotStyles = {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    position: 'absolute',
    top: 0,
    left: 10,
    border: '2px solid white',
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
  
  const titleStyles = {
    fontFamily: 'Mada',
    fontSize: '28px',
    color: '#02042D',
    mb: 4,
    fontWeight: 600,
  };
  
  const sectionTitleStyles = {
    fontFamily: 'Mada',
    fontSize: '18px',
    color: '#02042D',
    mb: 3,
    fontWeight: 600,
  };
  
  const labelStyles = {
    fontFamily: 'Inter',
    fontSize: '15px',
    color: '#666',
    fontWeight: 500,
  };
  
  const valueStyles = {
    fontFamily: 'Inter',
    fontSize: '16px',
    color: '#02042D',
    mt: 0.5,
  };
  
  const bioStyles = {
    fontFamily: 'Inter',
    fontSize: '14px',
    color: '#02042D',
    mt: 2,
    lineHeight: 1.5,
    backgroundColor: '#f5f5f5',
    p: 2,
    borderRadius: '8px',
  };
  
  const textFieldStyles = {
    mt: 1,
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontFamily: 'Inter',
      fontSize: '16px',
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
      '&:hover': {
        backgroundColor: '#02042D',
        opacity: 0.9,
      },
    },
    outlined: {
      borderColor: '#02042D',
      color: '#02042D',
      fontFamily: 'Inter',
      fontSize: '14px',
      textTransform: 'none',
      borderRadius: '8px',
      px: 4,
      '&:hover': {
        borderColor: '#02042D',
        backgroundColor: 'rgba(2, 4, 45, 0.05)',
      },
    },
  };
  
  const chartStyles = {
    p: 2,
    mt: 3,
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'fadeIn 0.5s ease-in',
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
  };
  
  const logsContainerStyles = {
    p: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    maxHeight: '300px',
    overflowY: 'auto',
  };
  
  const logItemStyles = {
    display: 'flex',
    alignItems: 'center',
    py: 1,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    '&:last-child': {
      borderBottom: 'none',
    },
  };
  
  const logDotStyles = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#42A5F5',
    mr: 1,
  };
  
  const logTextStyles = {
    fontFamily: 'Inter',
    fontSize: '14px',
    color: '#02042D',
  };
  
  const logTimestampStyles = {
    fontFamily: 'Inter',
    fontSize: '12px',
    color: '#666',
    ml: 'auto',
  };
  
  export {
    cardStyles,
    logsCardStyles,
    statusDotStyles,
    headerBarStyles,
    titleStyles,
    sectionTitleStyles,
    labelStyles,
    valueStyles,
    bioStyles,
    textFieldStyles,
    buttonStyles,
    chartStyles,
    logsContainerStyles,
    logItemStyles,
    logDotStyles,
    logTextStyles,
    logTimestampStyles,
  };