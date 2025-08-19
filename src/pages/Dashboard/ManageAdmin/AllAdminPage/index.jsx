import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { styles } from './ViewRolesPermissions/styles';
import { useFetchAdmin, useAddAdmin } from '../../../../Hooks/useRolesPermission';
import ViewRolesPermissions from '../AllAdminPage/ViewRolesPermissions';
import PermissionForm from '../AllAdminPage/PermissionForm';
import AddAdminForm from '../AllAdminPage/AddAdminForm';
import AdminTable from '../AllAdminPage/AdminTable';

export default function AllAdminPage() {
  const [showPermissions, setShowPermissions] = useState(false);
  const [showAddPermissionForm, setShowAddPermissionForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Reverted to selectedId
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  const { admins, loading } = useFetchAdmin();
  const { adminTypes, countries } = useAddAdmin();

  const handleShowPermissions = (id) => {
    const admin = admins.find((a) => a.id === id); // Find admin by id
    console.log('Admin selected for permissions with id:', id, 'admin:', admin);

    if (admin) {
      setSelectedId(id); // Set selectedId to the passed id
      setSelectedAdmin(admin);
      setShowPermissions(true);
    } else {
      console.warn('Admin not found for id:', id);
    }
  };

  return (
    <div style={{ ...styles.container, overflow: 'none', position: 'relative', zIndex: 1 }}>
      {showPermissions ? (
        <ViewRolesPermissions
          id={selectedId} // Reverted to id
          firstName={selectedAdmin?.firstname || 'Unknown'}
          lastName={selectedAdmin?.lastname || 'Unknown'}
          onBack={() => setShowPermissions(false)}
        />
      ) : showAddPermissionForm ? (
        <PermissionFormSection
          selectedAdminId={selectedId} // Using selectedId
          adminTypes={adminTypes}
          onCancel={() => setShowAddPermissionForm(false)}
        />
      ) : showAddForm ? (
        <AddAdminFormSection
          adminTypes={adminTypes}
          countries={countries}
        />
      ) : (
        <AdminTable
          admins={admins}
          loading={loading}
          onAddAdmin={() => setShowAddForm(true)}
          onShowPermissions={handleShowPermissions}
          onAddPermission={(id) => {
            const admin = admins.find((a) => a.id === id); // Using only id
            console.log('Selected Admin for Add Permission with id:', id, 'admin:', admin);
            setSelectedId(id); // Set selectedId to the passed id
            setShowAddPermissionForm(true);
          }}
        />
      )}
    </div>
  );
}

function PermissionFormSection({ selectedAdminId, adminTypes, onCancel }) {
  return (
    <div style={{ overflow: 'none', position: 'relative', zIndex: 1301 }}>
      <Header title="Add Permission" onCancel={onCancel} />
      <PermissionForm
        selectedAdminId={selectedAdminId}
        adminTypes={adminTypes}
        loadingTypes={false}
        onCancel={onCancel}
      />
    </div>
  );
}

function AddAdminFormSection({ adminTypes, countries }) {
  return (
    <div style={{ overflow: 'none', position: 'relative', zIndex: 1301 }}>
      <Header title="Add Admin" />
      <AddAdminForm adminTypes={adminTypes} countries={countries} />
    </div>
  );
}

function Header({ title, onCancel }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <Typography variant="h5" style={{ marginLeft: '16px', fontWeight: 600 }}>
        {title}
      </Typography>
      {onCancel && (
        <Typography
          variant="h6"
          style={{ marginRight: '16px', fontWeight: 600, cursor: 'pointer', color: '#1976d2' }}
          onClick={onCancel}
        >
          Cancel
        </Typography>
      )}
    </div>
  );
}