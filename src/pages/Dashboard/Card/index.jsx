import CustomTable from '../../../components/CustomTable';
import { useState } from 'react';
import { Box, Chip, Select, MenuItem, FormControl, IconButton, Button, Modal, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import PauseIcon from '@mui/icons-material/Pause';
import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledTableCell = styled('span')(({ theme }) => ({
    fontFamily: 'Mada',
    '&.table-text': {
        color: '#888B93',
        '&.font-weight-600': { fontWeight: 600 },
        '&.font-weight-400': { fontWeight: 400 },
        '&.font-weight-300': { fontWeight: 300 },
    },
}));

const Card = () => {
    const [filter, setFilter] = useState('');
    const [cards, setCards] = useState([
        { cardName: 'Visa Gold', cardNumber: '****1234', balance: '₦50,000', balanceChange: 2.5, transactionVolume: 300, expirationDate: '12/25', isActive: true, isFrozen: false, isBlocked: false },
        { cardName: 'Mastercard Platinum', cardNumber: '****5678', balance: '₦30,000', balanceChange: -1.2, transactionVolume: 150, expirationDate: '06/25', isActive: true, isFrozen: true, isBlocked: false },
        { cardName: 'Amex Black', cardNumber: '****9012', balance: '₦75,000', balanceChange: 5.0, transactionVolume: 450, expirationDate: '09/25', isActive: false, isFrozen: false, isBlocked: true },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleToggleActive = (cardNumber) => {
        setCards(prevCards =>
            prevCards.map(card =>
                card.cardNumber === cardNumber ? { ...card, isActive: !card.isActive } : card
            )
        );
        handleCloseModal();
        setTimeout(() => { }, 500);
    };

    const handleToggleFreeze = (cardNumber) => {
        setCards(prevCards =>
            prevCards.map(card =>
                card.cardNumber === cardNumber ? { ...card, isFrozen: !card.isFrozen } : card
            )
        );
        handleCloseModal();
        setTimeout(() => { }, 500);
    };

    const handleToggleBlock = (cardNumber) => {
        setCards(prevCards =>
            prevCards.map(card =>
                card.cardNumber === cardNumber ? { ...card, isBlocked: !card.isBlocked } : card
            )
        );
        handleCloseModal();
        setTimeout(() => { }, 500);
    };

    const getStatus = (card) => {
        if (card.isBlocked) return 'Blocked';
        if (card.isFrozen) return 'Frozen';
        if (!card.isActive) return 'Inactive';
        return 'Active';
    };

    const handleOpenModal = (event, cardNumber) => {
        setSelectedCard(cardNumber);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCard(null);
    };

    const formatRows = (data) =>
        data.map((item) => ({
            cardName: <StyledTableCell className="table-text font-weight-600">{item.cardName}</StyledTableCell>,
            cardNumber: <StyledTableCell className="table-text font-weight-400">{item.cardNumber}</StyledTableCell>,
            balance: <StyledTableCell className="table-text font-weight-400">{item.balance} <span style={{ color: item.balanceChange > 0 ? '#28a745' : '#dc3545' }}>{item.balanceChange}%</span></StyledTableCell>,
            transactionVolume: <StyledTableCell className="table-text font-weight-400">{item.transactionVolume}</StyledTableCell>,
            actions: (
                <Box sx={{ position: 'relative' }}>
                    <Tooltip title="Manage Card">
                        <IconButton onClick={(e) => handleOpenModal(e, item.cardNumber)} sx={{ color: '#218DC9' }}>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
            status: (
                <Chip
                    label={getStatus(item)}
                    size="small"
                    icon={getStatus(item) === 'Active' ? <CheckIcon /> : getStatus(item) === 'Frozen' ? <PauseIcon /> : <BlockIcon />}
                    sx={{
                        color: getStatus(item) === 'Active' ? '#28a745' : getStatus(item) === 'Frozen' ? '#ffc107' : '#dc3545',
                        backgroundColor: getStatus(item) === 'Active' ? 'rgba(40, 167, 69, 0.2)' : getStatus(item) === 'Frozen' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(220, 53, 69, 0.2)',
                        fontWeight: 400,
                        '& .MuiChip-icon': { color: 'inherit', fontSize: '16px' },
                    }}
                />
            ),
            expirationDate: <StyledTableCell className="table-text font-weight-300">{item.expirationDate}</StyledTableCell>,
        }));

    const columns = [
        { id: 'cardName', label: 'CARD NAME', minWidth: 170 },
        { id: 'cardNumber', label: 'CARD NUMBER', minWidth: 200 },
        { id: 'balance', label: 'BALANCE (NGN)', minWidth: 200 },
        { id: 'transactionVolume', label: 'TRANSACTION VOLUME', minWidth: 200 },
        { id: 'actions', label: 'ACTIONS', minWidth: 100 },
        { id: 'status', label: 'STATUS', minWidth: 160 },
        { id: 'expirationDate', label: 'EXPIRATION DATE', minWidth: 140 },
    ];

    const filteredCards = cards.filter((item) =>
        !filter || item.cardName.toLowerCase().includes(filter.toLowerCase()) || getStatus(item).toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Box sx={{ p: 1, backgroundColor: 'whitesmoke', position: 'relative' }}>
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
                        <MenuItem value="Visa Gold">Visa Gold</MenuItem>
                        <MenuItem value="Mastercard Platinum">Mastercard Platinum</MenuItem>
                        <MenuItem value="Amex Black">Amex Black</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Frozen">Frozen</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                        <MenuItem value="Blocked">Blocked</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <CustomTable
                columns={columns}
                rows={formatRows(filteredCards)}
                searchPlaceholder="search"
                sx={{ '& .MuiTableCell-root': { padding: '12px' }, position: 'relative' }}
            />
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '60%', // Adjusted to lower the modal slightly
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography id="modal-title" variant="h6" sx={{ mb: 2, fontFamily: 'Mada', fontWeight: 600 }}>
                        Manage Card
                    </Typography>
                    <Button
                        onClick={() => handleToggleActive(selectedCard)}
                        disabled={cards.find(card => card.cardNumber === selectedCard)?.isBlocked}
                        variant="contained"
                        sx={{
                            width: '80px', // Reduced width
                            height: '30px', // Reduced height
                            margin: '0 8px 8px 0',
                            backgroundColor: cards.find(card => card.cardNumber === selectedCard)?.isActive ? '#dc3545' : '#28a745',
                            '&:hover': { backgroundColor: cards.find(card => card.cardNumber === selectedCard)?.isActive ? '#c82333' : '#218838' },
                            fontSize: '12px', // Reduced font size for smaller buttons
                        }}
                    >
                        {cards.find(card => card.cardNumber === selectedCard)?.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                        onClick={() => handleToggleFreeze(selectedCard)}
                        disabled={cards.find(card => card.cardNumber === selectedCard)?.isBlocked || !cards.find(card => card.cardNumber === selectedCard)?.isActive}
                        variant="contained"
                        sx={{
                            width: '80px', // Reduced width
                            height: '30px', // Reduced height
                            margin: '0 8px 8px 0',
                            backgroundColor: cards.find(card => card.cardNumber === selectedCard)?.isFrozen ? '#ffc107' : '#ff9800',
                            '&:hover': { backgroundColor: cards.find(card => card.cardNumber === selectedCard)?.isFrozen ? '#e0a800' : '#f57c00' },
                            fontSize: '12px', // Reduced font size for smaller buttons
                        }}
                    >
                        {cards.find(card => card.cardNumber === selectedCard)?.isFrozen ? 'Unfreeze' : 'Freeze'}
                    </Button>
                    <Button
                        onClick={() => handleToggleBlock(selectedCard)}
                        variant="contained"
                        sx={{
                            width: '80px', // Reduced width
                            height: '30px', // Reduced height
                            margin: '0 0 8px 0',
                            backgroundColor: cards.find(card => card.cardNumber === selectedCard)?.isBlocked ? '#28a745' : '#dc3545',
                            '&:hover': { backgroundColor: cards.find(card => card.cardNumber === selectedCard)?.isBlocked ? '#218838' : '#c82333' },
                            fontSize: '12px', // Reduced font size for smaller buttons
                        }}
                    >
                        {cards.find(card => card.cardNumber === selectedCard)?.isBlocked ? 'Unblock' : 'Block'}
                    </Button>
                    <Typography
                        onClick={handleCloseModal}
                        sx={{
                            mt: 2,
                            color: '#218DC9',
                            cursor: 'pointer',
                            fontFamily: 'Mada',
                            fontSize: '14px',
                            textDecoration: 'underline',
                        }}
                    >
                        Close
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
};

export default Card;