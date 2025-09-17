import React, { useState, useMemo, useEffect } from 'react';
import { Box, TableCell, CircularProgress } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';
import AddRolesPage from '../ManageAdminRolesPage/AddRolesPage';
import { useFetchAdminTypes } from '../../../../Hooks/useAdmin';
import CustomButton from '../../../../components/CustomButton';
import EditRoleModal from '../ManageAdminRolesPage/EditRoleModal';
import ViewRoleModal from '../ManageAdminRolesPage/ViewRoleModal';

const columns = [
  { id: 'admin_type', label: 'ADMIN TYPE', minWidth: 200 },
  { id: 'actions', label: '', minWidth: 250 },
];

export default function ManageAdminRolesPage() {
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewRoleId, setViewRoleId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const { adminTypes: fetchedAdminTypes, loading, refetch } = useFetchAdminTypes();

  const handleAddRoleClick = () => setShowAddRoleForm(true);
  const handleBackToList = () => setShowAddRoleForm(false);

  const handleRoleAdded = async () => {
    setShowAddRoleForm(false);
    await refetch(); // <-- fetch latest roles from backend
  };

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setEditModalOpen(true);
  };

  const handleRoleUpdated = async () => {
    setEditModalOpen(false);
    await refetch();
  };

  const handleViewClick = (role) => {
    setViewRoleId(role.id || role._id);
    setViewModalOpen(true);
  };

  const rows = useMemo(() => {
    if (loading) {
      return [
        {
          id: 'loading',
          admin_type: (
            <TableCell colSpan={columns.length} align="center">
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                <CircularProgress size={28} />
              </Box>
            </TableCell>
          ),
          actions: null,
        },
      ];
    }

    return (fetchedAdminTypes || []).map((type) => ({
      id: type.id || type._id,
      admin_type: type.admin_type,
      actions: (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomButton type="edit" onClick={() => handleEditClick(type)} />
          <CustomButton type="view" onClick={() => handleViewClick(type)} />
        </Box>
      ),
    }));
  }, [fetchedAdminTypes, loading]);

  return (
    <Box sx={{ width: '100%', padding: '16px', backgroundColor: '#fff', borderRadius: '13px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      {showAddRoleForm ? (
        <AddRolesPage onCancel={handleBackToList} onRoleAdded={handleRoleAdded} />
      ) : (
        <CustomTable
          columns={columns}
          rows={rows}
          showAddButton
          addButtonTitle="Add Roles"
          onAddButtonClick={handleAddRoleClick}
          showFilterButton={false}
          title="Admin Roles"
          titleStyle={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            color: '#333333',
            marginLeft: '24px',
            marginBottom: '7px',
          }}
          searchPlaceholder="Search"
        />
      )}

      <EditRoleModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialData={selectedRole}
        onRoleUpdated={handleRoleUpdated}
      />

      <ViewRoleModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        roleId={viewRoleId}
      />
    </Box>
  );
}
