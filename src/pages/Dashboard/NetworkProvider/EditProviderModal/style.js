import { styled } from '@mui/material/styles';

export const formContainer = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export const formLayout = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

export const fieldRow = {
    display: 'flex',
    gap: 2,
};

export const textField = {
    flex: 1,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E0E0',
        },
        '&:hover fieldset': {
            borderColor: '#B0B0B0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
        },
    },
};

export const textFieldInput = {
    fontFamily: 'Mada',
    fontSize: '14px',
    color: '#333',
};

export const buttonRow = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    mt: 2,
};

export const cancelButton = {
    textTransform: 'none',
    color: '#d32f2f',
    borderColor: '#d32f2f',
    '&:hover': {
        borderColor: '#b71c1c',
        backgroundColor: 'rgba(211, 47, 47, 0.04)',
    },
};

export const addButton = {
    textTransform: 'none',
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#1565c0',
    },
};