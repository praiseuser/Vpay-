export const transactionStyles = {
    styledTableCell: ({ theme }) => ({
      fontFamily: 'Mada',
      '&.table-text': {
        color: '#888B93',
        '&.font-weight-600': { fontWeight: 600 },
        '&.font-weight-400': { fontWeight: 400 },
      },
    }),
    filterContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
    filterSelect: {
      minWidth: '180px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#B0B0B0' },
      },
    },
    textFieldInput: {
      height: '50px',
      padding: '0 14px',
      fontFamily: 'Mada',
      fontSize: '14px',
      color: '#333',
    },
  };