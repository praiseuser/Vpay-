import React from 'react';
import CustomTable from '../../../../../components/CustomTable';
import CustomButton from '../../../../../components/CustomButton';
import { CircularProgress } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    ? Array.from({ length: 1 }).map(() => ({
      number: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      gender: '',
      admin_type: '',
      country: '',
      action: (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={24} />
        </div>
      ),
    }))
    : admins.map((admin, index) => ({
      number: index + 1,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      phone: admin.phone,
      gender: admin.gender,
      admin_type: admin.admin_type || '', // Single value from backend
      country: admin.country_name || '',
      action: (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <CustomButton
            type="permission"
            onClick={() => onAddPermission(admin._id || admin.id || admin.userId)}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          />
          <ChevronRightIcon
            onClick={() => onShowPermissions(admin._id || admin.id || admin.userId)}
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
  );
}