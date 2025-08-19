import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import UserTable from './UserTable';
import UserDrawer from '../ManageUser/UserDrawer';
import { useFetchUsers } from '../../../Hooks/useUsers';
import { useFetchActiveUsers } from '../../../Hooks/useUsers';
import { useFetchBannedUsers } from '../../../Hooks/useUsers';

const User = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { users: allUsers, loading: allLoading, error: allError, fetchUsers: fetchAllUsers } = useFetchUsers(1);
  const { users: activeUsers, loading: activeLoading, error: activeError, fetchUsers: fetchActiveUsers } = useFetchActiveUsers();
  const { users: bannedUsers, loading: bannedLoading, error: bannedError, fetchUsers: fetchBannedUsers } = useFetchBannedUsers();

  const [tickets, setTickets] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    if (activeTabIndex === 0) fetchAllUsers();
    else if (activeTabIndex === 1) fetchActiveUsers();
    else if (activeTabIndex === 2) fetchBannedUsers();
  }, [activeTabIndex, fetchAllUsers, fetchActiveUsers, fetchBannedUsers]);

  useEffect(() => {
    if (activeTabIndex === 0) setTickets(allUsers || []);
    else if (activeTabIndex === 1) setTickets(activeUsers || []);
    else if (activeTabIndex === 2) setTickets(bannedUsers || []);
  }, [activeTabIndex, allUsers, activeUsers, bannedUsers]);

  const handleTabChange = (event, newValue) => {
    setActiveTabIndex(newValue);
  };

  const handleOpenDrawer = (id) => {
    setSelectedUserId(id);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUserId(null);
  };

  const getCurrentUsers = () => {
    if (activeTabIndex === 0) return { users: allUsers, loading: allLoading, error: allError };
    else if (activeTabIndex === 1) return { users: activeUsers, loading: activeLoading, error: activeError };
    else if (activeTabIndex === 2) {
      if (!bannedLoading && !bannedError && (bannedUsers === undefined || bannedUsers.length === 0)) {
        return { users: [{ message: 'No banned users' }], loading: false, error: null };
      }
      return { users: bannedUsers, loading: bannedLoading, error: bannedError };
    }
    return { users: [], loading: false, error: null };
  };

  const { users, loading, error } = getCurrentUsers();

  const columns = [
    { id: 'id', label: 'S/N', minWidth: 70 },
    { id: 'firstname', label: 'FIRST NAME', minWidth: 150 },
    { id: 'lastname', label: 'LAST NAME', minWidth: 150 },
    { id: 'email', label: 'EMAIL', minWidth: 200 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'phone', label: 'PHONE', minWidth: 150 },
    { id: 'gender', label: 'GENDER', minWidth: 120 },
    { id: 'action', label: '', minWidth: 80 },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <CustomTabs
        tabLabels={['All', 'Active Users', 'Banned Users']}
        value={activeTabIndex}
        onChange={handleTabChange}
      />
      <UserTable
        users={users}
        loading={loading}
        error={error}
        columns={columns}
        onOpenDrawer={handleOpenDrawer}
      />
      <UserDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        userId={selectedUserId}
      />
    </Box>
  );
};

export default User;