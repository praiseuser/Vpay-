import { Modal, Box, Button, Typography, CircularProgress } from '@mui/material';
import { useUpdateCardStatus } from '../../../../Hooks/useCards';

const CardModal = ({ open, onClose, selectedCard, cards, handleToggleActive, handleToggleFreeze, handleToggleBlock }) => {
    const getStatus = (card) => {
        if (card.isBlocked) return 'Blocked';
        if (card.isFrozen) return 'Frozen';
        if (!card.isActive) return 'Inactive';
        return 'Active';
    };

    const card = cards.find(card => card.cardNumber === selectedCard);
    const { freezeCard, loading, error } = useUpdateCardStatus();

    const handleFreeze = async () => {
        if (card && !loading) {
            const success = await freezeCard(card.id);
            if (success) handleToggleFreeze(selectedCard);
        }
        onClose();
    };

    // Placeholder for other actions since only freeze is supported by the API
    const handleActivate = () => {
        if (!loading) {
            toast.warning('Activate/Deactivate not supported by this API endpoint');
        }
        onClose();
    };

    const handleBlock = () => {
        if (!loading) {
            toast.warning('Block/Unblock not supported by this API endpoint');
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box
                sx={{
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
                }}
            >
                <Typography id="modal-title" variant="h6" sx={{ mb: 2, fontFamily: 'Mada', fontWeight: 600 }}>
                    Manage Card
                </Typography>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}
                {error && (
                    <Typography sx={{ color: 'red', mb: 2, fontSize: '12px' }}>
                        {error}
                    </Typography>
                )}
                <Button
                    onClick={handleActivate}
                    disabled={card?.isBlocked || loading}
                    variant="contained"
                    sx={{
                        width: '80px',
                        height: '30px',
                        margin: '0 8px 8px 0',
                        backgroundColor: card?.isActive ? '#dc3545' : '#28a745',
                        '&:hover': { backgroundColor: card?.isActive ? '#c82333' : '#218838' },
                        fontSize: '12px',
                    }}
                >
                    {card?.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                    onClick={handleFreeze}
                    disabled={card?.isBlocked || !card?.isActive || loading}
                    variant="contained"
                    sx={{
                        width: '80px',
                        height: '30px',
                        margin: '0 8px 8px 0',
                        backgroundColor: card?.isFrozen ? '#ffc107' : '#ff9800',
                        '&:hover': { backgroundColor: card?.isFrozen ? '#e0a800' : '#f57c00' },
                        fontSize: '12px',
                    }}
                >
                    {card?.isFrozen ? 'Unfreeze' : 'Freeze'}
                </Button>
                <Button
                    onClick={handleBlock}
                    disabled={loading}
                    variant="contained"
                    sx={{
                        width: '80px',
                        height: '30px',
                        margin: '0 0 8px 0',
                        backgroundColor: card?.isBlocked ? '#28a745' : '#dc3545',
                        '&:hover': { backgroundColor: card?.isBlocked ? '#218838' : '#c82333' },
                        fontSize: '12px',
                    }}
                >
                    {card?.isBlocked ? 'Unblock' : 'Block'}
                </Button>
                <Typography
                    onClick={onClose}
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
    );
};

export default CardModal;