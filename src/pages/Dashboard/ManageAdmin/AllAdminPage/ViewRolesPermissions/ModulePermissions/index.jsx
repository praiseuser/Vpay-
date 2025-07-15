import React from 'react';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import { styles } from '../../ViewRolesPermissions/styles';
import CustomSwitch from '../../../../../../components/CustomSwitch';
 
const normalizeName = (name) => name.toUpperCase();

const ModulePermissions = ({ module, permissions, onChange, onToggleAdminType }) => {
  const moduleKey = normalizeName(module.name);
  const modulePermissions = permissions?.[moduleKey] || {};

  return (
    <div style={styles.moduleBlock}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: 12,
          marginLeft: 28,
        }}
      >
        <Checkbox
          checked={modulePermissions.checked || false}
          onChange={(e) => onToggleAdminType(moduleKey, e.target.checked)}
          color="primary"
          style={{ marginBottom: 6 }}
        />
        <label style={styles.moduleTitle}>{module.name}</label>
      </div>

      <div style={styles.permissionHeader}>
        {module.permissions.map((perm) => (
          <span key={perm} style={styles.permissionLabel}>{perm}</span>
        ))}
      </div>
      <div style={styles.permissionSwitches}>
        {module.permissions.map((perm) => (
          <div key={perm} style={styles.switchWrapper}>
            <CustomSwitch
              color="success"
              checked={modulePermissions[perm.toLowerCase()] || false}
              onChange={(e) =>
                onChange(moduleKey, perm.toLowerCase(), e.target.checked)
              }
              disabled={!modulePermissions.checked}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulePermissions;
