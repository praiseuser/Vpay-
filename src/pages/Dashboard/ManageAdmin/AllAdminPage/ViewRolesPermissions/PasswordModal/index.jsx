import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, CircularProgress } from '@mui/material';

const PasswordModal = ({ open, onClose, onSubmit, password, setPassword, loading, error }) => {
    const handleSubmit = () => {
        onSubmit();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            disableEscapeKeyDown
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <Typography variant="h6">Enter Account Password</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Please enter your account password to view
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Account Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    onKeyPress={handleKeyPress}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => window.location.reload()} 
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={!password.trim() || loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordModal;