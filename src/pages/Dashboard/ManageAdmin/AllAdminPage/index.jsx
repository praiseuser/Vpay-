import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { styles } from './ViewRolesPermissions/styles';
import { useFetchAdmin, useAddAdmin } from '../../../../Hooks/useRolesPermission';
import ViewRolesPermissions from '../AllAdminPage/ViewRolesPermissions';
import AddAdminForm from '../AllAdminPage/AddAdminForm';
import AdminTable from '../AllAdminPage/AdminTable';

export default function AllAdminPage() {
  const [showPermissions, setShowPermissions] = useState(false);
  const [showAddPermissionForm, setShowAddPermissionForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);


  const { admins, loading, refetch: refetchAdmins } = useFetchAdmin();
  const { adminTypes, countries } = useAddAdmin();

  const handleShowPermissions = (admin_id) => {
    const admin = admins.find((a) => String(a.admin_id) === String(admin_id));
    if (admin) {
      setSelectedId(admin_id);
      setSelectedAdmin(admin);
      setShowPermissions(true);
    }
  };

  const handleAddPermission = async (admin_id) => {
    const admin = admins.find((a) => String(a.admin_id) === String(admin_id));
    if (admin) {
      setSelectedId(admin_id);
      setSelectedAdmin(admin);
      setShowAddPermissionForm(true);
    }
  };

  const handlePermissionUpdateSuccess = () => {
    refetchAdmins();
    setShowPermissions(false);
    setShowAddPermissionForm(false);
  };

  const handleAddAdminSuccess = () => {
    refetchAdmins();
    setShowAddForm(false);
  };

  return (
    <div style={{ ...styles.container, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
      {showPermissions ? (
        <ViewRolesPermissions
          Adminid={selectedAdmin?.id}
          AdminUniqueId={selectedAdmin?.admin_id}
          firstName={selectedAdmin?.firstname || 'Unknown'}
          lastName={selectedAdmin?.lastname || 'Unknown'}
          onBack={() => setShowPermissions(false)}
          onSuccess={handlePermissionUpdateSuccess}
        />
      ) : showAddPermissionForm ? (
        <PermissionFormSection
          selectedAdminId={selectedId}
          adminTypes={adminTypes}
          onCancel={() => setShowAddPermissionForm(false)}
          onSuccess={handlePermissionUpdateSuccess}
        />
      ) : showAddForm ? (
        <AddAdminFormSection
          adminTypes={adminTypes}
          countries={countries}
          onSuccess={handleAddAdminSuccess}
        />
      ) : (
        <AdminTable
          admins={admins}
          loading={loading}
          onAddAdmin={() => setShowAddForm(true)}
          onShowPermissions={handleShowPermissions}
          onAddPermission={handleAddPermission}
        />
      )}
    </div>
  );
}


function PermissionFormSection({ selectedAdminId, adminTypes, onCancel, onSuccess }) {
  return (
    <div style={{ overflow: 'hidden', position: 'relative', zIndex: 1301 }}>
    </div>
  );
}

function AddAdminFormSection({ adminTypes, countries, onSuccess }) {
  return (
    <div style={{ overflow: 'hidden', position: 'relative', zIndex: 1301 }}>
      <AddAdminForm adminTypes={adminTypes} countries={countries} onSuccess={onSuccess} />
    </div>
  );
}

