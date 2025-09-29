import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { styles } from "../../ViewRolesPermissions/styles";
import CustomSwitch from "../../../../../../components/CustomSwitch";

const ModulePermissions = ({ module, permissions, onChange, onToggleAdminType }) => {
  const moduleKey = String(module.admin_type_id);
  const modulePermissions = permissions?.[moduleKey] || {};

  return (
    <div style={styles.moduleBlock}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
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
        <label style={styles.moduleTitle}>
          {module.displayName || module.admin_type}
        </label>
      </div>

      <div style={styles.permissionHeader}>
        {["Create", "Read", "Update", "Delete"].map((perm) => (
          <span key={perm} style={styles.permissionLabel}>
            {perm}
          </span>
        ))}
      </div>

      <div style={styles.permissionSwitches}>
        {["create", "read", "update", "delete"].map((perm) => (
          <div key={perm} style={styles.switchWrapper}>
            <CustomSwitch
              color="success"
              checked={modulePermissions[perm] || false}
              onChange={(e) => onChange(moduleKey, perm, e.target.checked)}
              disabled={!modulePermissions.checked}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulePermissions;
