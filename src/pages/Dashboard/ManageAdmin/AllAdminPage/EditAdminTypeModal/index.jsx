import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Select, MenuItem, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const ACCEPTED_TYPES = ["BLOG", "USERS", "CURRENCIES", "COUNTRIES", "RATES", "SUPPORT", "PAYOUT", "PAYOUT_METHODS", "TRANSACTIONS", "FEES"];

const EditAdminTypeModal = ({ open, onClose, adminType, onSave }) => {
  const [formData, setFormData] = useState({ admin_type: '' });

  useEffect(() => {
    if (adminType) {
      console.log('Pre-populating form with adminType:', adminType);
      setFormData({ admin_type: adminType.admin_type || '' });
    }
  }, [adminType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting edited admin type:', formData);
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Edit Admin Type</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Select
          label="Admin Type"
          name="admin_type"
          value={formData.admin_type}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          displayEmpty
          renderValue={(selected) => selected || 'Select Admin Type'}
        >
          {ACCEPTED_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditAdminTypeModal;