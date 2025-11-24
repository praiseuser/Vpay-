import { Box } from "@mui/material";
import { useFetchBannedUsers } from "../../../../Hooks/useUsers";
import UserTable from "../UserTable";

const BannedUsersPage = ({ onViewDetails }) => {
  const { bannedUsers, loading, refetch } = useFetchBannedUsers(1);

  return (
    <Box>
      <UserTable
        users={bannedUsers}
        loading={loading}
        onViewDetails={onViewDetails}
      />
    </Box>
  );
};

export default BannedUsersPage;
