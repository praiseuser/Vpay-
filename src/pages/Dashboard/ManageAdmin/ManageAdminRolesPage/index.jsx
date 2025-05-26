import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import AddRolesPage from '../../AddRolesPage';

const columns = [
  { id: 'name', label: 'ADMIN ROLE', minWidth: 150 },
  { id: 'userId', label: 'NO OF ADMIN', minWidth: 150 },
  { id: 'role', label: 'STATUS', minWidth: 150 },
  { id: 'dateAdded', label: 'DATE ADDED', minWidth: 180 },
  { id: 'action', label: '', minWidth: 100 },
];

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const rows = [
  {
    name: <span style={{ ...rowStyle, fontWeight: 700, color: '#333' }}>Administrator</span>,
    userId: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2</span>,
    role: <CustomButton type="green" />,
    dateAdded: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-09 | 09:23 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
        <CustomButton type="disable" />
      </div>
    ),
  },
];

export default function ManageAdminRolesPage() {
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);

  const handleAddRoleClick = () => {
    setShowAddRoleForm(true);
  };

  const handleBackToList = () => {
    setShowAddRoleForm(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1070, mx: 'auto', mt: 2 }}>
      {showAddRoleForm ? (
        <AddRolesPage onCancel={handleBackToList} />
      ) : (
        <CustomTable
          columns={columns}
          rows={rows}
          showAddButton={true}
          addButtonTitle="Add Roles"
          addButtonStyle={{}}
          showFilterButton={false}
          title="Admin Roles"
          titleStyle={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '100%',
            letterSpacing: '0px',
            color: '#333333',
            marginLeft: '24px',
            marginBottom: '7px',
          }}
          searchPlaceholder="search"
          onAddButtonClick={handleAddRoleClick}
        />
      )}
    </Box>
  );
}
