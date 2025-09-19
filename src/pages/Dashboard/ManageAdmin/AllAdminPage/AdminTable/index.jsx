import React from 'react';
import CustomTable from '../../../../../components/CustomTable';
import BouncingLoader from '../../../../../components/BouncingLoader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';

const columns = [
  { id: 'number', label: '#', minWidth: 50 },
  { id: 'firstname', label: 'FIRST NAME', minWidth: 150 },
  { id: 'lastname', label: 'LAST NAME', minWidth: 150 },
  { id: 'email', label: 'EMAIL', minWidth: 150 },
  { id: 'phone', label: 'PHONE', minWidth: 150 },
  { id: 'gender', label: 'GENDER', minWidth: 150 },
  { id: 'admin_type', label: 'ADMIN TYPE', minWidth: 150 },
  { id: 'country', label: 'COUNTRY', minWidth: 150 },
  { id: 'action', label: '', minWidth: 200 },
];

export default function AdminTable({ admins, loading, onAddAdmin, onAddPermission, onShowPermissions }) {

  const rows = loading
    ? []
    : admins.map((admin, index) => ({
        number: index + 1,
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email,
        phone: admin.phone,
        gender: admin.gender,
        admin_type: admin.admin_types && admin.admin_types.length > 0
          ? admin.admin_types.join(', ')
          : '',
        country: admin.country_name || '',
        action: (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <ChevronRightIcon
              onClick={() => onShowPermissions(admin.admin_id)}
              style={{
                color: '#1976d2',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            />
          </div>
        ),
      }));

  return (
    <Box sx={{ position: 'relative', minHeight: '300px' }}>
      <CustomTable
        columns={columns}
        rows={rows}
        showAddButton
        addButtonTitle="Add ADMIN"
        addButtonStyle={{ marginTop: '10px' }}
        titleStyle={{
          fontFamily: 'Inter sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0px',
          color: '#333333',
          marginLeft: '24px',
          marginBottom: '8px',
        }}
        searchPlaceholder="search"
        onAddButtonClick={onAddAdmin}
      />
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '65%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            marginTop: '20px',
          }}
        >
          <BouncingLoader />
        </Box>
      )}
    </Box>
  );
}
