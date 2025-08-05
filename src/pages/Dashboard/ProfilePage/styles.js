import { Paper, Box, Avatar, Button, Dialog, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const ProfileCard = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: 24,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    background: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        borderRadius: 16,
    },
}));

export const HeaderGradient = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #02042D 0%, rgba(2, 4, 45, 0.8) 100%)',
    padding: theme.spacing(3),
    borderRadius: '16px 16px 0 0',
    textAlign: 'center',
    color: '#fff',
    margin: theme.spacing(-4, -4, 4, -4),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 90,
    height: 90,
    fontSize: 34,
    backgroundColor: '#fff',
    color: '#1565c0',
    border: '3px solid #fff',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
    margin: '-45px auto 20px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.08)',
    },
}));

export const InfoRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0),
    '& .label': {
        fontWeight: 600,
        color: '#444',
        flex: '0 0 110px',
        fontSize: '0.95rem',
        fontFamily: 'Inter, sans-serif',
    },
    '& .value': {
        color: '#222',
        fontSize: '0.95rem',
        fontWeight: 400,
        fontFamily: 'Inter, sans-serif',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& .label': {
            flex: 'none',
            marginBottom: theme.spacing(0.5),
        },
    },
}));

export const UpdateButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #030547 0%, rgba(3, 5, 71, 0.9) 100%)',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    padding: theme.spacing(1.5, 4),
    borderRadius: 10,
    transition: 'background 0.3s ease, transform 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #030547 0%, rgba(3, 5, 71, 0.9) 100%)',
        transform: 'translateY(-2px)',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: theme.spacing(1.2, 2),
    },
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 16,
        padding: theme.spacing(2),
        background: '#fff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: 500,
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2),
        },
    },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-root': {
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'Inter, sans-serif',
        color: '#444',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#e0e0e0',
        },
        '&:hover fieldset': {
            borderColor: '#1565c0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1565c0',
        },
    },
}));