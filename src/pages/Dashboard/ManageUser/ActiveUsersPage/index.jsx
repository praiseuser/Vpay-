import { Box } from "@mui/material";
import { useFetchActiveUsers } from "../../../../Hooks/useUsers";
import UserTable from "../UserTable";

const ActiveUsersPage = ({ onViewDetails }) => {
  const { users, loading, error } = useFetchActiveUsers(1);

  return (
    <Box>
      <UserTable users={users} loading={loading} error={error} onViewDetails={onViewDetails} />
    </Box>
  );
};

export default ActiveUsersPage;
