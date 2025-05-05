import React from 'react';
import { Box, Card, Typography, FormControlLabel, Switch, TextField, IconButton } from '@mui/material';
import { User, Sun, Moon } from 'lucide-react';

const PersonalPreferences = ({ cardStyles, headerBarStyles, sectionTitleStyles, labelStyles, textFieldStyles, switchLabelStyles, buttonStyles, settings, setSettings }) => {
  const handleNotificationToggle = (e) => {
    setSettings((prev) => ({ ...prev, emailNotifications: e.target.checked }));
  };

  const handlePasswordChange = (e) => {
    setSettings((prev) => ({ ...prev, newPassword: e.target.value }));
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={headerBarStyles} />
      <Typography sx={sectionTitleStyles}>
        <User size={20} /> Personal Preferences
      </Typography>
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={settings.emailNotifications} onChange={handleNotificationToggle} />}
          label="Email Notifications for New User Registrations"
          sx={switchLabelStyles}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>Update Password</Typography>
        <TextField
          type="password"
          placeholder="New Password"
          value={settings.newPassword}
          onChange={handlePasswordChange}
          sx={textFieldStyles}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>Theme Preference</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton
            onClick={() => handleThemeChange('light')}
            sx={{
              bgcolor: settings.theme === 'light' ? '#42A5F5' : 'transparent',
              color: settings.theme === 'light' ? 'white' : '#02042D',
              borderRadius: '8px',
            }}
          >
            <Sun size={20} />
          </IconButton>
          <IconButton
            onClick={() => handleThemeChange('dark')}
            sx={{
              bgcolor: settings.theme === 'dark' ? '#42A5F5' : 'transparent',
              color: settings.theme === 'dark' ? 'white' : '#02042D',
              borderRadius: '8px',
            }}
          >
            <Moon size={20} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PersonalPreferences;