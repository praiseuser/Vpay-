import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import PasswordModal from "../../../Card/PasswordModal";
import {
  useFetchAdminPermissions,
  useUpdateAdminPermissions,
  useFetchAllRoles,
} from "../../../../../Hooks/useRolesPermission";
import HeaderBar from "../ViewRolesPermissions/HeaderBar";
import PermissionGrid from "../ViewRolesPermissions/PermissionGrid";
import ActionButtons from "../ViewRolesPermissions/ActionButtons";

const ViewRolesPermissions = ({ adminId, firstName, lastName, onBack }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { permissions, setPermissions, loading, error: fetchError, refetchPermissions } =
    useFetchAdminPermissions(adminId);

  const {
    roles: allRoles,
    loading: rolesLoading,
    error: rolesError,
    refetch: refetchRoles,
  } = useFetchAllRoles();

  const {
    isUpdating,
    error: updateError,
    handlePermissionChange,
    handleAdminTypeToggle,
    updatePermissions,
  } = useUpdateAdminPermissions(adminId, permissions, setPermissions);

  const [formattedPermissions, setFormattedPermissions] = useState({});

  useEffect(() => {
    if (!allRoles || !permissions) return;

    const formatted = {};

    allRoles.forEach((role) => {
      // ✅ Find permission data for this specific role
      const perm = permissions[String(role.id)] || {};

      // ✅ Merge backend data and local state (this fixes the issue)
      formatted[role.id] = {
        admin_id: adminId,
        admin_type_id: role.id,
        displayName: role.admin_type || `Module-${role.id}`,
        create: Boolean(perm.create),
        read: Boolean(perm.read),
        update: Boolean(perm.update),
        delete: Boolean(perm.delete),

        // ✅ Automatically mark as checked if any permission is true
        checked: Boolean(
          perm.checked ||
          perm.create ||
          perm.read ||
          perm.update ||
          perm.delete
        ),
      };
    });

    setFormattedPermissions(formatted);
  }, [permissions, allRoles, adminId]);

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) return;

    setPasswordLoading(true);
    const updateFunc = updatePermissions(formattedPermissions);
    const success = await updateFunc(accountPassword);
    setPasswordLoading(false);

    if (success) {
      setAccountPassword("");
      setModalOpen(false);

      console.log("Update successful, now refetching permissions...");
      await refetchPermissions();
      await refetchRoles();
    }
  };

  const displayError = fetchError || rolesError || updateError;
  const isLoading = loading || rolesLoading;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f9fafb",
        p: 2,
      }}
    >
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
            <Box
              height="40vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
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
