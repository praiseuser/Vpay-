import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useFetchCards } from '../../../Hooks/useCards';
import CardTable from '../../Dashboard/Card/CardTable';
import CardModal from '../../Dashboard/Card/CardModal';
import PasswordModal from '../Card/PasswordModal';

const Card = ({ collapsed }) => {
    const [filter, setFilter] = useState('');
    const [cards, setCards] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    
    const [accountPassword, setAccountPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const { 
        cards: fetchedCards, 
        loading, 
        error, 
        showPasswordModal,
        passwordVerified,
        verifyPassword,
        resetState
    } = useFetchCards();

    useEffect(() => {
        if (fetchedCards.length > 0) {
            const mappedCards = fetchedCards.map(card => ({
                ...card,
                isActive: card.status.toLowerCase() === 'active',
                isFrozen: card.status.toLowerCase() === 'frozen',
                isBlocked: card.status.toLowerCase() === 'blocked',
                expirationDate: `${card.expiryMonth || 'N/A'}/${card.expiryYear || 'N/A'}`,
            }));
            setCards(mappedCards);
        }
    }, [fetchedCards]);

    const handlePasswordSubmit = async () => {
        if (!accountPassword.trim()) {
            return;
        }
        
        setPasswordLoading(true);
        const success = await verifyPassword(accountPassword);
        setPasswordLoading(false);
        
        if (success) {
            setAccountPassword('');
        }
    };

    const handlePasswordModalClose = () => {
    };

    const handleToggleActive = (cardNumber) => {
        setCards(prevCards =>
            prevCards.map(card =>
                card.cardNumber === cardNumber ? { ...card, isActive: !card.isActive, status: card.isActive ? 'Inactive' : 'Active' } : card
            )
        );
        handleCloseModal();
        setTimeout(() => {}, 500);
    };

    const handleToggleFreeze = (cardNumber) => {
        setCards(prevCards =>
            prevCards.map(card =>
                card.cardNumber === cardNumber ? { ...card, isFrozen: !card.isFrozen, status: card.isFrozen ? 'Active' : 'Frozen' } : card
            )
        );
        handleCloseModal();
        setTimeout(() => {}, 500);
    };

    const handleToggleBlock = (cardNumber) => {
        setCards(prevCards =>
            prevCards.map(card =>
                card.cardNumber === cardNumber ? { ...card, isBlocked: !card.isBlocked, status: card.isBlocked ? 'Active' : 'Blocked' } : card
            )
        );
        handleCloseModal();
        setTimeout(() => {}, 500);
    };

    const handleOpenModal = (cardNumber) => {
        console.log('Opening modal for cardNumber:', cardNumber);
        setSelectedCard(cardNumber);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCard(null);
    };

    return (
        <Box>
            <PasswordModal 
                open={showPasswordModal} 
                onClose={handlePasswordModalClose}
                onSubmit={handlePasswordSubmit}
                password={accountPassword}
                setPassword={setAccountPassword}
                loading={passwordLoading || loading}
                error={error}
            />
            <Box sx={{ 
                opacity: showPasswordModal ? 0.3 : 1,
                pointerEvents: showPasswordModal ? 'none' : 'auto',
                transition: 'opacity 0.3s ease'
            }}>
                <CardTable
                    cards={cards}
                    filter={filter}
                    setFilter={setFilter}
                    loading={loading}
                    error={error}
                    handleOpenModal={handleOpenModal}
                />
                <CardModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    selectedCard={selectedCard}
                    cards={cards}
                    handleToggleActive={handleToggleActive}
                    handleToggleFreeze={handleToggleFreeze}
                    handleToggleBlock={handleToggleBlock}
                />
            </Box>
        </Box>
    );
};

export default Card;