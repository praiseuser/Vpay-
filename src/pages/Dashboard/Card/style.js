import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

export const StyledTableCell = styled('span')(({ theme }) => ({
    fontFamily: 'Mada',
    '&.table-text': {
        color: '#888B93',
        '&.font-weight-600': { fontWeight: 600 },
        '&.font-weight-400': { fontWeight: 400 },
        '&.font-weight-300': { fontWeight: 300 },
    },
}));

export const CardContainer = styled(Box)(({ theme }) => ({
    p: 2,
    backgroundColor: 'whitesmoke',
    position: 'relative',
}));

export const FilterBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    mb: 2,
}));

export const FormControlStyled = styled(FormControl)(({ theme }) => ({
    minWidth: 200,
}));

export const SelectStyled = styled(Select)(({ theme }) => ({
    borderRadius: '8px',
    backgroundColor: '#fff',
    '& .MuiSelect-select': { padding: '8px' },
}));

export const TableStyled = styled(CustomTable)(({ theme }) => ({
    '& .MuiTableCell-root': { padding: '12px' },
    position: 'relative',
}));

export const ModalStyled = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const ModalContent = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
    mb: 2,
    fontFamily: 'Mada',
    fontWeight: 600,
}));

export const ActionButton = styled(Button)(({ theme, active, frozen, blocked }) => ({
    width: '80px',
    height: '30px',
    margin: '0 8px 8px 0',
    fontSize: '12px',
    ...(active && { backgroundColor: '#dc3545', '&:hover': { backgroundColor: '#c82333' } }),
    ...(!active && { backgroundColor: '#28a745', '&:hover': { backgroundColor: '#218838' } }),
    ...(frozen && { backgroundColor: '#ffc107', '&:hover': { backgroundColor: '#e0a800' } }),
    ...(!frozen && { backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }),
    ...(blocked && { backgroundColor: '#28a745', '&:hover': { backgroundColor: '#218838' } }),
    ...(!blocked && { backgroundColor: '#dc3545', '&:hover': { backgroundColor: '#c82333' } }),
    '&:last-child': { margin: '0 0 8px 0' },
}));

export const CloseText = styled(Typography)(({ theme }) => ({
    mt: 2,
    color: '#218DC9',
    cursor: 'pointer',
    fontFamily: 'Mada',
    fontSize: '14px',
    textDecoration: 'underline',
}));