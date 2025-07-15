const rowStyle = {
    fontFamily: 'Raleway, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.3%',
  };
  
  const tableTitleStyle = {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '100%',
    letterSpacing: '0px',
    color: '#333333',
    marginLeft: '24px',
    marginBottom: '7px',
  };
  
  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden',
  };
  
  const contentContainerStyle = {
    flexGrow: 1,
    overflowY: 'auto',
    paddingTop: '4px',
    paddingBottom: '16px',
    position: 'relative',
  };
  
  const loadingOverlayStyle = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    p: 2,
  };
  
  const errorMessageStyle = {
    textAlign: 'center',
    color: 'red',
    marginTop: '16px',
  };
  
  export {
    rowStyle,
    tableTitleStyle,
    pageContainerStyle,
    contentContainerStyle,
    loadingOverlayStyle,
    errorMessageStyle,
  };