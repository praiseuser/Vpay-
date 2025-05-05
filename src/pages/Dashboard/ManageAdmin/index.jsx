import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import AllAdminPage from './AllAdminPage';
import ManageAdminRolesPage from './ManageAdminRolesPage';


export default function ManageAdmin() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100vh' : 'auto',
        overflow: 'hidden',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <CustomTabs
          tabLabels={["All Admin", "Manage Admin Roles"]}
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginTop: '32px',
        }}
      >
        {activeTab === 0 && <AllAdminPage />}
        {activeTab === 1 && <ManageAdminRolesPage />}
      </div>
    </div>
  );
}
