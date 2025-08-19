import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { API_BASE_URL } from '../config/path';

export const usePasswordManagement = (adminId) => {
    const [password, setPassword] = useState('');
    const [otpMedium, setOtpMedium] = useState('email');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const token = useSelector((state) => state.user.token);

    const requestOtp = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            console.log('Full URL:', `${API_BASE_URL}/user/password/request/otp`);
            console.log('Sending payload:', { otp_type: otpMedium });
            await axios.post(`${API_BASE_URL}/user/password/request/otp`, {
                otp_type: otpMedium
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOtpSent(true);
            toast(<CustomSuccessToast message={`OTP sent successfully! Check your ${otpMedium}`} />);
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to request OTP';
            setError(msg);
            toast(<CustomErrorToast message={msg} />);
        } finally {
            setLoading(false);
        }
    }, [adminId, otpMedium, token]);

    const createPassword = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await axios.post(`${API_BASE_URL}/user/password/create`, {
                password,
                otp_medium: otpMedium,
                otp
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess(true);
            toast(<CustomSuccessToast message="Account password created successfully!" />);
            setPassword('');
            setOtp('');
            setOtpSent(false);
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to create password';
            setError(msg);
            toast(<CustomErrorToast message={msg} />);
        } finally {
            setLoading(false);
        }
    }, [adminId, password, otpMedium, otp, token]);

    const resetForm = useCallback(() => {
        setPassword('');
        setOtp('');
        setOtpSent(false);
        setError(null);
        setSuccess(false);
    }, []);

    useEffect(() => {
        if (!token) {
            setError('No authentication token found');
            setLoading(false);
        }
    }, [token]);

    return {
        password,
        setPassword,
        otpMedium,
        setOtpMedium,
        otp,
        setOtp,
        loading,
        error,
        success,
        otpSent,
        requestOtp,
        createPassword,
        resetForm,
    };
};
export default usePasswordManagement;