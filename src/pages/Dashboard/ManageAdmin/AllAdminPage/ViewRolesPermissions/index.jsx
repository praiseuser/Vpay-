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

const ViewRolesPermissions = ({
  adminId,
  firstName,
  lastName,
  onBack,
  onSuccess,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [forceRefresh, setForceRefresh] = useState(0);

  const {
    permissions,
    loading,
    error: fetchError,
    refetchPermissions,
  } = useFetchAdminPermissions(adminId);

  const {
    roles: allRoles,
    loading: rolesLoading,
    error: rolesError,
    refetch: refetchRoles,
  } = useFetchAllRoles();

  const {
    isUpdating,
    error: updateError,
    updatePermissions,
  } = useUpdateAdminPermissions();

  const [formattedPermissions, setFormattedPermissions] = useState({});

  // THIS USEEFFECT WILL TELL US THE TRUTH
  useEffect(() => {
    console.log("🔥🔥 USE-EFFECT TRIGGERED — REBUILDING UI");
    console.log("   Raw permissions:", permissions);
    console.log("   All roles:", allRoles);
    console.log("   Force refresh counter:", forceRefresh);

    if (!allRoles || !permissions) {
      console.log("⏳ Waiting for data...");
      return;
    }

    const formatted = {};
    allRoles.forEach((role) => {
      const perm = permissions[String(role.id)] || {};
      formatted[role.id] = {
        admin_type_id: role.id,
        displayName: role.admin_type || `Module-${role.id}`,
        create: Boolean(perm.create),
        read: Boolean(perm.read),
        update: Boolean(perm.update),
        delete: Boolean(perm.delete),
        checked:
          Boolean(perm.checked) ||
          Boolean(perm.create) ||
          Boolean(perm.read) ||
          Boolean(perm.update) ||
          Boolean(perm.delete),
      };
    });

    console.log("✅ FINAL FORMATTED PERMISSIONS SET TO STATE:", formatted);
    setFormattedPermissions(formatted);
  }, [permissions, allRoles, forceRefresh]); // ← forceRefresh forces it EVERY time

  const handleAdminTypeToggle = (adminTypeId, checked) => {
    setFormattedPermissions((prev) => ({
      ...prev,
      [adminTypeId]: {
        ...prev[adminTypeId],
        checked,
        create: checked ? prev[adminTypeId]?.create || false : false,
        read: checked ? prev[adminTypeId]?.read || false : false,
        update: checked ? prev[adminTypeId]?.update || false : false,
        delete: checked ? prev[adminTypeId]?.delete || false : false,
      },
    }));
  };

  const handlePermissionChange = (adminTypeId, perm, value) => {
    setFormattedPermissions((prev) => ({
      ...prev,
      [adminTypeId]: { ...prev[adminTypeId], [perm]: value },
    }));
  };

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) return;

    setPasswordLoading(true);

    const payload = {};
    Object.values(formattedPermissions).forEach((perm) => {
      payload[String(perm.admin_type_id)] = {
        create: perm.checked ? !!perm.create : false,
        read: perm.checked ? !!perm.read : false,
        update: perm.checked ? !!perm.update : false,
        delete: perm.checked ? !!perm.delete : false,
      };
    });

    console.log("🚀 SUBMITTING PAYLOAD:", payload);

    const success = await updatePermissions(adminId, payload, accountPassword);

    if (success) {
      console.log("🎉 BACKEND SUCCESS — NOW REFETCHING...");

      setAccountPassword("");
      setModalOpen(false);

      // Refetch fresh data
      await refetchPermissions();
      await refetchRoles();

      // THIS IS THE NUCLEAR FIX
      setForceRefresh((prev) => prev + 1);

      console.log("🔥 FORCE REFRESH TRIGGERED — UI WILL REBUILD NOW");

      if (onSuccess) onSuccess();
    }

    setPasswordLoading(false);
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
              handleAdminTypeToggle={handleAdminTypeToggle}
              handlePermissionChange={handlePermissionChange}
            />
          )}
        </Paper>

        <ActionButtons
          onBack={onBack}
          onSave={() => setModalOpen(true)}
          isUpdating={isUpdating || passwordLoading}
        />

        <PasswordModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handlePasswordSubmit}
          password={accountPassword}
          setPassword={setAccountPassword}
          loading={isUpdating || passwordLoading}
          error={updateError}
        />
      </Box>
    </Box>
  );
};

export default ViewRolesPermissions;
