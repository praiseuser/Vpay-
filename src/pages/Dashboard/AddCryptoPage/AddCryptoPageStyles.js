const styles = {
  container: {
    width: '100%',
    maxWidth: 1100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    paddingLeft: 0,
    paddingRight: 0,
    overflowX: 'hidden',
    '@media (max-width: 600px)': {
      paddingLeft: 2,
      paddingRight: 2,
    },
  },
  paper: {
    width: '100%',
    border: '2px solid #DCE7EC',
    borderRadius: '20px',
    backgroundColor: 'white',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    '@media (max-width: 600px)': {
      padding: 2,
      borderRadius: '16px',
      gap: 3,
    },
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '26px',
    color: '#4A85F6',
    marginTop: 2,
    marginLeft: 2,
    '@media (max-width: 600px)': {
      marginTop: 1,
      marginLeft: 0,
      fontSize: '22px',
    },
  },
  divider: {
    borderBottom: '2px solid #D9D9D9',
    marginLeft: -32,
    marginRight: -32,
    '@media (max-width: 600px)': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingLeft: 3,
    paddingRight: 3,
    '@media (max-width: 600px)': {
      gap: 3,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  inputFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '@media (max-width: 600px)': {
      gap: 1,
    },
  },
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: 1,
    },
  },
  fieldContainer: {
    width: '48%',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  statusField: {
    width: '50%',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  fieldLabel: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '16px',
    color: '#363853',
    marginBottom: '10px',
  },
  textField: {
    backgroundColor: '#F5F7FA',
    borderRadius: '12px',
    '& .MuiOutlinedInput-root': {
      height: '48px',
      borderRadius: '12px',
      border: '1px solid #E0E4E8',
      '& fieldset': {
        borderColor: '#D9D9D9',
      },
      '&:hover fieldset': {
        borderColor: '#4A85F6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4A85F6',
      },
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Raleway',
      fontSize: '16px',
      color: '#363853',
      padding: '12px 16px',
    },
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
    '@media (max-width: 600px)': {
      marginTop: 1,
      gap: 2,
    },
  },
  cancelText: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '14px',
    color: '#73757C',
    cursor: 'pointer',
    textTransform: 'capitalize',
    padding: '8px 16px',
  },
  addButton: {
    width: '140px',
    height: '48px',
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '14px',
    textTransform: 'capitalize',
    borderRadius: '12px',
    backgroundColor: '#208BC9',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#1B7BB5',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
};

export default styles;