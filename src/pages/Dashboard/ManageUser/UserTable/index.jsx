import { Box, Typography } from "@mui/material";
import CustomTable from "../../../../components/CustomTable";
import CustomLoader from "../../../../components/CustomLoader";
import { useState, useEffect } from "react";
import { useSuspendUser } from "../../../../Hooks/useUsers";
import { useActivateUser } from "../../../../Hooks/useUsers";
import UserRow from "./UserRow";

const columns = [
  { id: "id", label: "S/N", minWidth: 70 },
  { id: "firstname", label: "FIRST NAME", minWidth: 150 },
  { id: "lastname", label: "LAST NAME", minWidth: 150 },
  { id: "email", label: "EMAIL", minWidth: 200 },
  { id: "status", label: "STATUS", minWidth: 120 },
  { id: "phone", label: "PHONE", minWidth: 150 },
  { id: "gender", label: "GENDER", minWidth: 120 },
  { id: "action", label: "ACTIONS", minWidth: 140 },
];

const UserTable = ({
  users = [],
  loading,
  error,
  onViewDetails,
  onUserUpdated,
}) => {
  const [localUsers, setLocalUsers] = useState(users);
  const [switchLoading, setSwitchLoading] = useState({});
  const { suspendUser } = useSuspendUser();
  const { activateUser } = useActivateUser();

  useEffect(() => setLocalUsers(users), [users]);

  const handleToggleUser = async (userId, currentStatus) => {
    setSwitchLoading((prev) => ({ ...prev, [userId]: true }));
    setLocalUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: currentStatus === 1 ? 0 : 1 }
          : user
      )
    );

    try {
      if (currentStatus === 1) {
        await suspendUser(userId);
      } else {
        await activateUser(userId); 
      }
      if (onUserUpdated) onUserUpdated();
    } catch {
      setLocalUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: currentStatus } : user
        )
      );
    } finally {
      setSwitchLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ position: "relative", minHeight: "300px" }}>
      <CustomTable
        columns={columns}
        rows={localUsers.map((user, index) =>
          UserRow({
            user,
            index,
            onSuspend: handleToggleUser,
            loading: switchLoading,
            onViewDetails,
          })
        )}
        showAddButton={false}
        sx={{
          "& .MuiTableCell-root": { padding: "12px" },
          opacity: loading ? 0.5 : 1,
        }}
      />
      {loading && <CustomLoaderOverlay />}
      {!loading && localUsers.length === 0 && <NoUsersFound />}
    </Box>
  );
};

const CustomLoaderOverlay = () => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    }}
  >
    <CustomLoader />
  </Box>
);

const NoUsersFound = () => (
  <Box
    sx={{
      position: "absolute",
      top: "57%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    }}
  >
    <Typography>No users found</Typography>
  </Box>
);

export default UserTable;
