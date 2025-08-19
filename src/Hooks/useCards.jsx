import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';
import { useCallback } from 'react';

const useFetchCards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(true);
    const [passwordVerified, setPasswordVerified] = useState(false);
    const hasFetched = useRef(false);

    const token = useSelector((state) => state.user.token);

    const verifyPasswordAndFetchCards = async (accountPassword) => {
        setLoading(true);
        setError(null);

        if (!token) {
            console.warn('No token found in useFetchCards');
            setError('Authentication token is missing');
            toast.error('Authentication token is missing');
            setLoading(false);
            return false;
        }

        if (!accountPassword) {
            setError('Account password is required');
            toast.error('Account password is required');
            setLoading(false);
            return false;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/admin/cards`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'account-password': accountPassword,
                },
            });

            console.log('Fetched cards response:', response.data);

            const data = response.data.result || [];
            const formattedCards = Array.isArray(data)
                ? data.map((item) => ({
                    id: item.id || null,
                    userId: item.user_id || null,
                    cardNumber: item.card_number || null,
                    cvv: item.cvv !== undefined ? item.cvv : null,
                    expiryMonth: item.expiry_month !== undefined ? item.expiry_month : null,
                    expiryYear: item.expiry_year !== undefined ? item.expiry_year : null,
                    cardName: item.name_on_card || null,
                    status: item.status || 'Inactive',
                    balance: item.balance !== undefined ? parseFloat(item.balance) : null,
                    createdAt: item.created_at || null,
                    cardType: item.card_type || null,
                    currencyId: item.currency_id || null,
                }))
                : [];

            
            if (formattedCards.length === 0) {
                setError('No cards available');
                toast.info('No cards found');
            } else {
                setCards(formattedCards);
            }

            setPasswordVerified(true);
            setShowPasswordModal(false);
            hasFetched.current = true;
            return true;

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Invalid password or failed to fetch cards';
            console.error('Error fetching cards:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
            console.log('Fetch cards operation completed. Loading:', false);
        }
    };

    const resetState = () => {
        setCards([]);
        setPasswordVerified(false);
        setShowPasswordModal(true);
        setError(null);
        hasFetched.current = false;
    };

    return { 
        cards, 
        loading, 
        error, 
        showPasswordModal,
        passwordVerified,
        verifyPassword: verifyPasswordAndFetchCards,
        resetState
    };
};
const useUpdateCardStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.user.token);

    const updateCardStatus = useCallback(async (cardId, status) => {
        setLoading(true);
        setError(null);

        if (!token) {
            console.warn('No token found in useUpdateCardStatus');
            setError('Authentication token is missing');
            toast.error('Authentication token is missing');
            setLoading(false);
            return false;
        }

        try {
            console.log(`Updating card ${cardId} status to ${status} at: ${API_BASE_URL}/user/card/status`);
            const response = await axios.post(
                `${API_BASE_URL}/user/card/status`,
                { cardId, status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Update card status response:', response.data);
            toast.success(`Card ${status.toLowerCase()}d successfully`);
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || `Failed to ${status.toLowerCase()} card`;
            console.error('Error updating card status:', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
            console.log('Status update operation completed. Loading:', false);
        }
    }, [token]);

    return { updateCardStatus, loading, error };
};

export { useFetchCards, useUpdateCardStatus };   