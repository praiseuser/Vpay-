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
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminLastName, setSelectedAdminLastName] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);

  const { admins, loading } = useFetchAdmin();
  const { adminTypes, countries } = useAddAdmin();

  const handleShowPermissions = (id) => {
    const admin = admins.find((a) => a.admin_id === id || a.id === id);
    console.log('Admin selected for permissions:', admin);

    if (admin) {
      const lastName = admin.lastname || 'Unknown Last Name';
      setSelectedAdminId(admin.admin_id);
      setSelectedAdminLastName(lastName);
      setShowPermissions(true);
    } else { 
      console.warn('Admin not found for id:', id);
    }
  };


  return (
    <div style={{ ...styles.container, overflow: 'none', position: 'relative', zIndex: 1 }}>
      {showPermissions ? (
        <ViewRolesPermissions
          adminId={selectedAdminId}
          lastName={selectedAdminLastName}
          onBack={() => setShowPermissions(false)}
        />
      ) : showAddPermissionForm ? (
        <PermissionFormSection
          selectedAdminId={selectedAdminId}
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
            const admin = admins.find((a) => a.admin_id === id || a.id === id);
            console.log('Selected Admin for Add Permission:', admin, 'ID:', id);
            setSelectedAdminId(admin ? admin.admin_id : null);
            setShowAddPermissionForm(true);
          }}
        />
      )}
    </div>
  );
}

function PermissionFormSection({ selectedAdminId, adminTypes, onCancel }) {
  return (
    <div style={{ overflow: 'none', position: 'relative', zIndex: 1301, }}>
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
    <div style={{ overflow: 'none', position: 'relative', zIndex: 1301, }}>
      <Header title="Add Admin"/>
      <AddAdminForm adminTypes={adminTypes} countries={countries}/>
    </div>
  );
}

function Header({ title, }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <Typography variant="h5" style={{ marginLeft: '16px', fontWeight: 600 }}>
        {title}
      </Typography>
    </div>
  );
}
