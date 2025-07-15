import React, { useEffect } from 'react';
import { Box, Modal, CircularProgress, Typography } from '@mui/material';
import { useUpdateAdminType } from '../../../../../Hooks/useAdmin';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
};

function EditRoleForm({ initialData, onCancel, onSave, loading, error }) {
  const [adminType, setAdminType] = React.useState(initialData.admin_type || '');

  React.useEffect(() => {
    setAdminType(initialData.admin_type || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      onSave({ ...initialData, admin_type: adminType });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Role</h2>
      <input
        type="text"
        value={adminType}
        onChange={(e) => setAdminType(e.target.value)}
        placeholder="Admin Type"
        style={{ width: '100%', padding: '8px', marginBottom: '16px', fontSize: '16px' }}
        required
        disabled={loading}
      />
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button type="button" onClick={onCancel} style={{ padding: '8px 12px' }} disabled={loading}>
          Cancel
        </button>
        <button type="submit" style={{ padding: '8px 12px' }} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default function EditRoleModal({ open, onClose, initialData, onRoleUpdated }) {
  const { updateAdminType, loading, error, success, resetSuccess } = useUpdateAdminType();
  useEffect(() => {
    if (success) {
      onRoleUpdated(initialData.id);
      resetSuccess();
      onClose();
    }
  }, [success, onClose, onRoleUpdated, resetSuccess, initialData]);

  const handleSave = (updatedRole) => {
    updateAdminType(updatedRole.id || updatedRole._id, { admin_type: updatedRole.admin_type });
  };

  if (!initialData) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-role-modal" >
      <Box sx={style}>
        <EditRoleForm
          initialData={initialData}
          onCancel={onClose}
          onSave={handleSave}
          loading={loading}
          error={error}
        />
      </Box>
    </Modal>
  );
}
