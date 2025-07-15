const modalContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const modalBoxStyle = {
    width: '100%',
    maxWidth: 400,
    bgcolor: 'white',
    borderRadius: '16px',
    p: 3,
    boxShadow: 24,
  };
  
  const titleStyle = {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '20px',
    color: '#4A85F6',
    mb: 2,
  };
  
  const statusLabelStyle = {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    color: '#363853',
    mb: '8px',
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
  };
  
  const cancelButtonStyle = {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '12px',
    textTransform: 'capitalize',
    color: '#73757C',
    cursor: 'pointer',
  };
  
  const saveButtonStyle = {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: '12px',
    textTransform: 'capitalize',
    color: '#FFFFFF',
    backgroundColor: '#208BC9',
    borderRadius: '10px',
    padding: '10px 30px',
    display: 'inline-block',
    textAlign: 'center',
  };
  
  export {
    modalContainerStyle,
    modalBoxStyle,
    titleStyle,
    statusLabelStyle,
    buttonContainerStyle,
    cancelButtonStyle,
    saveButtonStyle,
  };