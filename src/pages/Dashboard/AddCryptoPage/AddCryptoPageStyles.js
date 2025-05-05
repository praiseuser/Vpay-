const styles = {
    container: {
      width: '100%',
      maxWidth: 1070,
      mx: 'auto',
      mt: 4,
      px: (theme) => (theme.breakpoints.down('sm') ? 2 : 0),
    },
    paper: {
      width: '100%',
      border: '2px solid #DCE7EC',
      borderRadius: '16px',
      backgroundColor: 'white',
      p: (theme) => (theme.breakpoints.down('sm') ? 2 : 3),
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    },
    title: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '24px',
      color: '#4A85F6',
      mt: (theme) => (theme.breakpoints.down('sm') ? 2 : 4),
      ml: (theme) => (theme.breakpoints.down('sm') ? 0 : 3),
    },
    divider: {
      borderBottom: '2px solid #D9D9D9',
      mx: (theme) => (theme.breakpoints.down('sm') ? 0 : '-24px'),
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: (theme) => (theme.breakpoints.down('sm') ? 4 : 3),
      px: (theme) => (theme.breakpoints.down('sm') ? 0 : 4),
    },
    inputFields: {
      display: 'flex',
      flexDirection: (theme) => (theme.breakpoints.down('sm') ? 'column' : 'row'),
      justifyContent: (theme) => (theme.breakpoints.down('sm') ? 'flex-start' : 'space-between'),
      gap: (theme) => (theme.breakpoints.down('sm') ? 4 : 2),
      alignItems: (theme) => (theme.breakpoints.down('sm') ? 'flex-start' : 'center'),
    },
    fieldContainer: {
      width: (theme) => (theme.breakpoints.down('sm') ? '100%' : '261px'),
    },
    fieldLabel: {
      fontFamily: 'Raleway',
      fontWeight: 600,
      fontSize: '14px',
      color: '#363853',
      mb: '8px',
    },
    textField: {
      backgroundColor: '#FAFAFA',
      borderRadius: '10px',
      '& .MuiOutlinedInput-root': {
        height: '40px',
        borderRadius: '10px',
        '& fieldset': {
          borderColor: '#D9D9D9',
        },
      },
      '& .MuiInputBase-input': {
        fontFamily: 'Raleway',
        fontSize: '14px',
        color: '#363853',
      },
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 2,
      mt: (theme) => (theme.breakpoints.down('sm') ? 1 : 0),
    },
    cancelText: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '12px',
      color: '#73757C',
      cursor: 'pointer',
      textTransform: 'capitalize',
    },
    addButton: {
      width: '119px',
      height: '40px',
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '12px',
      textTransform: 'capitalize',
      borderRadius: '10px',
      backgroundColor: '#208BC9',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#208BC9',
        opacity: 0.9,
      },
    },
  };
  
  export default styles;