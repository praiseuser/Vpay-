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

    const [activityPin, setActivityPin] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const {
        cards: fetchedCards,
        loading,
        error,
        showPasswordModal,
        passwordVerified,
        verifyPassword,
        resetState,
    } = useFetchCards();

    // ✅ Load cards when password is verified
    useEffect(() => {
        if (passwordVerified && fetchedCards.length > 0) {
            const mappedCards = fetchedCards.map((card) => ({
                ...card,
                isActive: card.status.toLowerCase() === 'active',
                isFrozen: card.status.toLowerCase() === 'frozen',
                isBlocked: card.status.toLowerCase() === 'blocked',
                expirationDate: `${card.expiryMonth || 'N/A'}/${card.expiryYear || 'N/A'}`,
            }));
            setCards(mappedCards);
        }
    }, [fetchedCards, passwordVerified]);

    // ✅ Handle password verification
    const handlePasswordSubmit = async () => {
        if (!activityPin.trim()) return;
        setPasswordLoading(true);
        const success = await verifyPassword(activityPin);
        setPasswordLoading(false);
        if (success) {
            setActivityPin('');
            handlePasswordModalClose(); // ✅ Close PasswordModal when verified
        }
    };

    // ✅ Close modal manually if needed
    const handlePasswordModalClose = () => {
        setActivityPin('');
    };

    const handleOpenModal = (cardNumber) => {
        setSelectedCard(cardNumber);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCard(null);
    };

    // ✅ Toggle actions
    const handleToggleActive = (cardNumber) => {
        setCards((prev) =>
            prev.map((card) =>
                card.cardNumber === cardNumber
                    ? { ...card, isActive: !card.isActive, status: card.isActive ? 'Inactive' : 'Active' }
                    : card
            )
        );
        handleCloseModal();
    };

    const handleToggleFreeze = (cardNumber) => {
        setCards((prev) =>
            prev.map((card) =>
                card.cardNumber === cardNumber
                    ? { ...card, isFrozen: !card.isFrozen, status: card.isFrozen ? 'Active' : 'Frozen' }
                    : card
            )
        );
        handleCloseModal();
    };

    const handleToggleBlock = (cardNumber) => {
        setCards((prev) =>
            prev.map((card) =>
                card.cardNumber === cardNumber
                    ? { ...card, isBlocked: !card.isBlocked, status: card.isBlocked ? 'Active' : 'Blocked' }
                    : card
            )
        );
        handleCloseModal();
    };

    return (
        <Box>
            {/* ✅ Password Modal - visible only when needed */}
            {showPasswordModal && !passwordVerified && (
                <PasswordModal
                    open={showPasswordModal}
                    onClose={handlePasswordModalClose}
                    onSubmit={handlePasswordSubmit}
                    password={activityPin}
                    setPassword={setActivityPin}
                    loading={passwordLoading}
                    error={error}
                />
            )}

            {/* ✅ Table and modals section */}
            <Box
                sx={{
                    opacity: showPasswordModal && !passwordVerified ? 0.3 : 1,
                    pointerEvents: showPasswordModal && !passwordVerified ? 'none' : 'auto',
                    transition: 'opacity 0.3s ease',
                }}
            >
                <CardTable
                    cards={cards}
                    filter={filter}
                    setFilter={setFilter}
                    loading={loading}
                    error={error}
                    handleOpenModal={handleOpenModal}
                    passwordVerified={passwordVerified}
                />
            </Box>

            {/* ✅ Card Action Modal */}
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
    );
};

export default Card;
