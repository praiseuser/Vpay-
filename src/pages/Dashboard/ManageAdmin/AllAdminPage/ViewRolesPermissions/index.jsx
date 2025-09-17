import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PasswordModal from "../../../Card/PasswordModal";
import {
  useFetchAdminPermissions,
  useUpdateAdminPermissions,
  useFetchAllRoles,
} from "../../../../../Hooks/useRolesPermission";
import HeaderBar from "../ViewRolesPermissions/HeaderBar";
import PermissionGrid from "../ViewRolesPermissions/PermissionGrid";
import ActionButtons from "../ViewRolesPermissions/ActionButtons";

const ViewRolesPermissions = ({ Adminid, AdminUniqueId, firstName, lastName, onBack }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { permissions, setPermissions, loading, error: fetchError } = useFetchAdminPermissions(Adminid);
  const { roles: allRoles, loading: rolesLoading, error: rolesError, refetch: refetchRoles } = useFetchAllRoles();
  const { isUpdating, error: updateError, handlePermissionChange, handleAdminTypeToggle, updatePermissions } =
    useUpdateAdminPermissions(AdminUniqueId, permissions, setPermissions);

  const [formattedPermissions, setFormattedPermissions] = useState({});

  useEffect(() => {
    if (!allRoles) return;
    const formatted = {};

    if (permissions && Object.keys(permissions).length > 0) {
      Object.keys(permissions).forEach((moduleName) => {
        const modulePerms = permissions[moduleName] || {};
        const roleInfo = allRoles.find((role) => role.id === modulePerms.admin_type_id);
        const displayName = roleInfo?.admin_type || moduleName || "Unknown";

        formatted[displayName] = {
          admin_id: modulePerms.admin_id || null,
          admin_type_id: modulePerms.admin_type_id || null,
          enabled:
            Boolean(
              modulePerms.checked ||
              modulePerms.create ||
              modulePerms.read ||
              modulePerms.update ||
              modulePerms.delete
            ),
          create: Boolean(modulePerms.create),
          read: Boolean(modulePerms.read),
          update: Boolean(modulePerms.update),
          delete: Boolean(modulePerms.delete),
          checked: Boolean(modulePerms.checked),
        };
      });
    }

    allRoles.forEach((role) => {
      if (!formatted[role.admin_type]) {
        formatted[role.admin_type] = {
          admin_id: AdminUniqueId,
          admin_type_id: role.id,
          enabled: false,
          create: false,
          read: false,
          update: false,
          delete: false,
          checked: false,
        };
      }
    });

    setFormattedPermissions(formatted);
  }, [permissions, allRoles, AdminUniqueId]);

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) return;
    setPasswordLoading(true);
    const updateFunc = updatePermissions(formattedPermissions);
    const success = await updateFunc(accountPassword);
    setPasswordLoading(false);
    if (success) {
      setAccountPassword("");
      setModalOpen(false);
      refetchRoles();
    }
  };

  const displayError = fetchError || rolesError || updateError;
  const isLoading = loading || rolesLoading;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", bgcolor: "#f9fafb", p: 2 }}>
      <Box
        sx={{
          background: "white",
          borderRadius: 3,
          padding: 4,
          width: "100%",
          maxWidth: "100%",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeaderBar title={`${firstName} ${lastName} — Role Permissions`} />

        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "#fdfdfd" }}>
          {isLoading ? (
            <Box height="40vh" display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : displayError ? (
            <Typography color="error" sx={{ p: 2 }}>
              {displayError}
            </Typography>
          ) : (
            <PermissionGrid
              formattedPermissions={formattedPermissions}
              setFormattedPermissions={setFormattedPermissions}
              handlePermissionChange={handlePermissionChange}
              handleAdminTypeToggle={handleAdminTypeToggle}
            />
          )}
        </Paper>

        <ActionButtons
          onBack={onBack}
          onSave={() => setModalOpen(true)}
          isUpdating={isUpdating}
        />

        <PasswordModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handlePasswordSubmit}
          password={accountPassword}
          setPassword={setAccountPassword}
          loading={passwordLoading || isUpdating}
          error={updateError}
        />
      </Box>
    </Box>
  );
};

export default ViewRolesPermissions;
