import { Box, FormControl, Select, MenuItem, Typography, CircularProgress, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import PauseIcon from '@mui/icons-material/Pause';
import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CustomTable from '../../../../components/CustomTable'

const StyledTableCell = styled('span')(({ theme }) => ({
    fontFamily: 'Mada',
    '&.table-text': {
        color: '#888B93',
        '&.font-weight-600': { fontWeight: 600 },
        '&.font-weight-400': { fontWeight: 400 },
        '&.font-weight-300': { fontWeight: 300 },
    },
}));

const CardTable = ({ cards, filter, setFilter, loading, error, handleOpenModal }) => {
    const getStatus = (card) => {
        if (card.isBlocked) return 'Blocked';
        if (card.isFrozen) return 'Frozen';
        if (!card.isActive) return 'Inactive';
        return 'Active';
    };

    const maskCardNumber = (number) => {
        if (!number) return '-';
        const firstFour = number.slice(0, 4);
        const remaining = '*'.repeat(number.length - 4);
        return `${firstFour}${remaining}`;
    };

    const maskCVV = () => '***';

    const maskExpiryYear = (year) => {
        if (!year) return '-';
        const firstDigit = year.slice(0, 1);
        const remaining = '*'.repeat(year.length - 1);
        return `${firstDigit}${remaining}`;
    };

    const formatRows = (data) =>
        data.map((item, index) => {
            console.log('Formatting row:', item);
            return {
                id: <StyledTableCell className="table-text font-weight-400">{index + 1}</StyledTableCell>, // Serial number starting from 1
                cardNumber: <StyledTableCell className="table-text font-weight-400">{maskCardNumber(item.cardNumber)}</StyledTableCell>,
                cvv: <StyledTableCell className="table-text font-weight-400">{maskCVV()}</StyledTableCell>,
                expiryMonth: <StyledTableCell className="table-text font-weight-400">{item.expiryMonth || '-'}</StyledTableCell>,
                expiryYear: <StyledTableCell className="table-text font-weight-400">{maskExpiryYear(item.expiryYear)}</StyledTableCell>,
                cardName: <StyledTableCell className="table-text font-weight-600">{item.cardName || '-'}</StyledTableCell>,
                status: (
                    <Chip
                        label={getStatus(item) || '-'}
                        size="small"
                        icon={getStatus(item) === 'Active' ? <CheckIcon /> : getStatus(item) === 'Frozen' ? <PauseIcon /> : getStatus(item) === 'Blocked' ? <BlockIcon /> : null}
                        sx={{
                            color: getStatus(item) === 'Active' ? '#28a745' : getStatus(item) === 'Frozen' ? '#ffc107' : getStatus(item) === 'Blocked' ? '#dc3545' : '#888B93',
                            backgroundColor: getStatus(item) === 'Active' ? 'rgba(40, 167, 69, 0.2)' : getStatus(item) === 'Frozen' ? 'rgba(255, 193, 7, 0.2)' : getStatus(item) === 'Blocked' ? 'rgba(220, 53, 69, 0.2)' : 'rgba(136, 139, 147, 0.2)',
                            fontWeight: 400,
                            '& .MuiChip-icon': { color: 'inherit', fontSize: '16px' },
                        }}
                    />
                ),
                balance: <StyledTableCell className="table-text font-weight-400">{item.balance || '-'}</StyledTableCell>,
                createdAt: <StyledTableCell className="table-text font-weight-400">{item.createdAt || '-'}</StyledTableCell>,
                cardType: <StyledTableCell className="table-text font-weight-400">{item.cardType || '-'}</StyledTableCell>,
                currencyId: <StyledTableCell className="table-text font-weight-400">{item.currencyId || '-'}</StyledTableCell>,
                actions: (
                    <Box sx={{ position: 'relative' }}>
                        <Tooltip title="Manage Card">
                            <IconButton onClick={(e) => handleOpenModal(item.cardNumber)} sx={{ color: '#218DC9' }}>
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            };
        });

    const columns = [
        { id: 'id', label: 'S/N', minWidth: 150 }, // Updated label to S/N for serial number
        { id: 'cardNumber', label: 'CARD NUMBER', minWidth: 150 },
        { id: 'cvv', label: 'CVV', minWidth: 150 },
        { id: 'expiryMonth', label: 'EXPIRY MONTH', minWidth: 150 },
        { id: 'expiryYear', label: 'EXPIRY YEAR', minWidth: 150 },
        { id: 'cardName', label: 'NAME OF CARD', minWidth: 150 },
        { id: 'status', label: 'STATUS', minWidth: 150 },
        { id: 'balance', label: 'BALANCE', minWidth: 150 },
        { id: 'createdAt', label: 'CREATED AT', minWidth: 150 },
        { id: 'cardType', label: 'CARD TYPE', minWidth: 150 },
        { id: 'currencyId', label: 'CURRENCY ID', minWidth: 150 },
        { id: 'actions', label: 'ACTIONS', minWidth: 150 },
    ];

    const filteredCards = cards.filter((item) =>
        !filter || (item.cardName?.toLowerCase().includes(filter.toLowerCase()) || getStatus(item).toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <Box sx={{ width: '100%', position: 'relative', minHeight: '200px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Filter cards' }}
                        sx={{ borderRadius: '8px', backgroundColor: '#fff', '& .MuiSelect-select': { padding: '8px' } }}
                    >
                        <MenuItem value=""><em>All Cards</em></MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Frozen">Frozen</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                        <MenuItem value="Blocked">Blocked</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <CustomTable
                columns={columns}
                rows={formatRows(filteredCards)}
                searchPlaceholder="search"
                sx={{
                    '& .MuiTableCell-root': {
                        padding: '12px',
                        textAlign: 'center',
                    },
                    '& .MuiTableHead-root .MuiTableCell-root': {
                        fontWeight: 600,
                        padding: '12px',
                        minWidth: '150px',
                        backgroundColor: '#f5f5f5',
                        borderBottom: '1px solid #ddd',
                    },
                    '& .MuiTableBody-root .MuiTableCell-root': {
                        borderBottom: '1px solid #eee',
                    },
                    position: 'relative',
                    opacity: loading ? 0.5 : 1,
                    pointerEvents: loading ? 'none' : 'auto',
                }}
            />
            {error && (
                <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
                    Error: {error}
                </Typography>
            )}
        </Box>
    );
};

export default CardTable;