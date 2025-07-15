export const formContainer = {
    backgroundColor: 'white',
    maxWidth: '650px',
    width: '100%',
    margin: '0 auto',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
};

export const formLayout = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

export const fieldRow = {
    display: 'flex',
    gap: '25px',
    flexWrap: 'wrap',
};

export const textField = {
    flex: 1,
    minWidth: '260px',
    maxWidth: '100%',
};

export const textFieldInput = {
    height: '50px',
    padding: '0 14px',
};

export const buttonRow = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '25px',
};

export const cancelButton = {
    padding: '8px 20px',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
};

export const addButton = {
    padding: '8px 20px',
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'all 0.3s',
    },
};