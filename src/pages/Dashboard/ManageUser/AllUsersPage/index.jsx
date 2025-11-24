import { Box } from "@mui/material";
import { useFetchUsers } from "../../../../Hooks/useUsers";
import UserTable from "../UserTable";

const AllUsersPage = ({ onViewDetails }) => {
  const { users, loading, error } = useFetchUsers(1);

  return (
    <Box>
      <UserTable users={users} loading={loading} error={error} onViewDetails={onViewDetails} />
    </Box>
  );
};

export default AllUsersPage;
