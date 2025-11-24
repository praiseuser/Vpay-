import { useState } from "react";
import { Box } from "@mui/material";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import AllUsersPage from "./AllUsersPage";
import ActiveUsersPage from "./ActiveUsersPage";
import BannedUsersPage from "./BannedUsersPage";
import UserDetailsWrapper from "./UserDetailsWrapper";

const User = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  return (
    <Box sx={{ p: 0 }}>
      {!selectedUserId ? (
        <>
          <CustomTabs
            tabLabels={["All", "Active Users", "Banned Users"]}
            value={activeTab}
            onChange={handleTabChange}
          />
          {activeTab === 0 && <AllUsersPage onViewDetails={setSelectedUserId} />}
          {activeTab === 1 && <ActiveUsersPage onViewDetails={setSelectedUserId} />}
          {activeTab === 2 && <BannedUsersPage onViewDetails={setSelectedUserId} />}
        </>
      ) : (
        <UserDetailsWrapper
          userId={selectedUserId}
          onBack={() => setSelectedUserId(null)}
        />
      )}
    </Box>
  );
};

export default User;
