import { useEffect } from 'react';
import UserDetailsDrawer from '../../ManageUser/UserDetailsDrawer';
import { useFetchUserById } from '../../../../Hooks/useUsers';

const UserDrawer = ({ open, onClose, userId }) => {
  const { user, loading, error, fetchUser } = useFetchUserById();

  useEffect(() => {
    if (open && userId) {
      fetchUser(userId);
    }
  }, [open, userId, fetchUser]);

  return <UserDetailsDrawer open={open} onClose={onClose} userId={userId} />;
};

export default UserDrawer;