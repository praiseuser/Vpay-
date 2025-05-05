import React, { useState } from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import {
  cardStyles,
  logsCardStyles,
  statusDotStyles,
  headerBarStyles,
  sectionTitleStyles,
  labelStyles,
  valueStyles,
  bioStyles,
  textFieldStyles,
  buttonStyles,
  logsContainerStyles,
  logItemStyles,
  logDotStyles,
  logTextStyles,
  logTimestampStyles,
} from './ProfilePageStyles';
import ProfileHeader from '../ProfilePage/ProfileHeader';
import ProfileBio from '../ProfilePage/ProfileBio';
import ProfileForm from '../ProfilePage/ProfileForm';
import LogsCard from '../ProfilePage/LogsCard';


const adminLogs = [
  { type: 'Login', action: 'Logged in', timestamp: 'April 23, 2025, 12:30 AM' },
  { type: 'Update', action: 'Updated profile', timestamp: 'April 22, 2025, 3:15 PM' },
  { type: 'Settings', action: 'Changed settings', timestamp: 'April 22, 2025, 10:00 AM' },
  { type: 'Review', action: 'Reviewed user data', timestamp: 'April 21, 2025, 9:45 AM' },
  { type: 'Logout', action: 'Logged out', timestamp: 'April 20, 2025, 11:30 PM' },
];


const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Jesus Boi',
    email: 'jesusboi@gmail.com',
    phone: '+234 567 8900 900',
    role: 'Super Admin',
    adminId: 'ADM001',
    joined: 'April 2025',
    lastLogin: 'April 23, 2025, 12:30 AM',
    profilePicture: null,
    bio: 'Super Admin overseeing operations with a passion for efficiency and security.',
  });
  const [logFilter, setLogFilter] = useState('All');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        width: '100%',
      }}
    >

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card sx={cardStyles}>
            <Box sx={headerBarStyles} />
            <ProfileHeader
              profile={profile}
              statusDotStyles={statusDotStyles}
              sectionTitleStyles={sectionTitleStyles}
            />
            <ProfileBio
              bio={profile.bio}
              bioStyles={bioStyles}
            />
            <ProfileForm
              profile={profile}
              isEditing={isEditing}
              handleChange={handleChange}
              handleProfilePictureChange={handleProfilePictureChange}
              handleEditToggle={handleEditToggle}
              handleSave={handleSave}
              labelStyles={labelStyles}
              valueStyles={valueStyles}
              textFieldStyles={textFieldStyles}
              buttonStyles={buttonStyles}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <LogsCard
            logs={adminLogs}
            logFilter={logFilter}
            setLogFilter={setLogFilter}
            logsCardStyles={logsCardStyles}
            headerBarStyles={headerBarStyles}
            sectionTitleStyles={sectionTitleStyles}
            logsContainerStyles={logsContainerStyles}
            logItemStyles={logItemStyles}
            logDotStyles={logDotStyles}
            logTextStyles={logTextStyles}
            logTimestampStyles={logTimestampStyles}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;