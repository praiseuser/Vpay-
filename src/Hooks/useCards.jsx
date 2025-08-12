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
    const hasFetched = useRef(false);

    const token = useSelector((state) => state.user.token);

    const fetchCards = async () => {
        setLoading(true);
        setError(null);

        if (!token) {
            console.warn('No token found in useFetchCards');
            setError('Authentication token is missing');
            toast.error('Authentication token is missing');
            setLoading(false);
            return;
        }

        try {
            console.log(`Fetching cards from: ${API_BASE_URL}/admin/cards`);
            const response = await axios.get(`${API_BASE_URL}/admin/cards`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
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

            console.log('Formatted cards:', formattedCards);
            if (formattedCards.length === 0) {
                setError('No cards available');
                toast.info('No cards found');
            } else {
                setCards(formattedCards);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch cards';
            console.error('Error fetching cards:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            console.log('Fetch cards operation completed. Loading:', false);
        }
    };

    useEffect(() => {
        if (token && !hasFetched.current) {
            fetchCards();
            hasFetched.current = true;
        }
    }, [token]);

    return { cards, loading, error, refetch: fetchCards };
};

const useUpdateCardStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.user.token);

    const freezeCard = useCallback(async (cardId) => {
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
            console.log(`Freezing card ${cardId} at: ${API_BASE_URL}/v1/user/card/status`);
            const response = await axios.post(
                `${API_BASE_URL}/user/card/status`,
                { cardId, action: 'freeze' }, // Adjusted payload based on freezing only
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Freeze card response:', response.data);
            toast.success('Card frozen successfully');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to freeze card';
            console.error('Error freezing card:', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
            console.log('Freeze operation completed. Loading:', false);
        }
    }, [token]);

    return { freezeCard, loading, error };
};

export { useFetchCards, useUpdateCardStatus };   