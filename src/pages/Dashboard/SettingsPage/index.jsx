import React, { useState } from 'react';
import { Box, Grid, Button,  Typography  } from '@mui/material';
import {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles,
  labelStyles,
  textFieldStyles,
  selectStyles,
  menuPropsStyles,
  switchLabelStyles,
  buttonStyles,
  sessionItemStyles,
  sessionTextStyles,
  sessionSubTextStyles,
  apiKeyItemStyles,
  apiKeyTextStyles,
  widgetItemStyles,
  widgetTextStyles,
  backupTextStyles,
} from './SettingsPageStyles';
import GlobalSettings from '../SettingsPage/GlobalSettings';
import PersonalPreferences from '../SettingsPage/PersonalPreferences';
import SecuritySettings from '../SettingsPage/SecuritySettings';
import DashboardCustomization from '../SettingsPage/DashboardCustomization';
import BackupExport from '../SettingsPage/BackupExport';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    currency: 'USD',
    feeRate: '2.5',
    emailNotifications: true,
    newPassword: '',
    theme: 'light',
    twoFactorAuth: false,
    ipWhitelist: '',
    activeSessions: [
      { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'New York, USA', lastActive: 'April 23, 2025, 12:30 AM' },
      { id: 2, device: 'iPhone 14', browser: 'Safari', location: 'London, UK', lastActive: 'April 22, 2025, 3:15 PM' },
    ],
    widgets: [
      { id: 1, name: 'Recent Activity', enabled: true },
      { id: 2, name: 'Stats Overview', enabled: true },
      { id: 3, name: 'User Growth Chart', enabled: false },
    ],
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <Box sx={pageStyles}>
      <Typography sx={titleStyles}>Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GlobalSettings
            cardStyles={cardStyles}
            headerBarStyles={headerBarStyles}
            sectionTitleStyles={sectionTitleStyles}
            labelStyles={labelStyles}
            selectStyles={selectStyles}
            menuPropsStyles={menuPropsStyles}
            settings={settings}
            setSettings={setSettings}
          />
        </Grid>
        <Grid item xs={12}>
          <PersonalPreferences
            cardStyles={cardStyles}
            headerBarStyles={headerBarStyles}
            sectionTitleStyles={sectionTitleStyles}
            labelStyles={labelStyles}
            textFieldStyles={textFieldStyles}
            switchLabelStyles={switchLabelStyles}
            buttonStyles={buttonStyles}
            settings={settings}
            setSettings={setSettings}
          />
        </Grid>
        <Grid item xs={12}>
          <SecuritySettings
            cardStyles={cardStyles}
            headerBarStyles={headerBarStyles}
            sectionTitleStyles={sectionTitleStyles}
            labelStyles={labelStyles}
            textFieldStyles={textFieldStyles}
            switchLabelStyles={switchLabelStyles}
            buttonStyles={buttonStyles}
            sessionItemStyles={sessionItemStyles}
            sessionTextStyles={sessionTextStyles}
            sessionSubTextStyles={sessionSubTextStyles}
            apiKeyItemStyles={apiKeyItemStyles}
            apiKeyTextStyles={apiKeyTextStyles}
            settings={settings}
            setSettings={setSettings}
          />
        </Grid>
        <Grid item xs={12}>
          <DashboardCustomization
            cardStyles={cardStyles}
            headerBarStyles={headerBarStyles}
            sectionTitleStyles={sectionTitleStyles}
            widgetItemStyles={widgetItemStyles}
            widgetTextStyles={widgetTextStyles}
            settings={settings}
            setSettings={setSettings}
          />
        </Grid>
        <Grid item xs={12}>
          <BackupExport
            cardStyles={cardStyles}
            headerBarStyles={headerBarStyles}
            sectionTitleStyles={sectionTitleStyles}
            backupTextStyles={backupTextStyles}
            buttonStyles={buttonStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                ...buttonStyles.contained,
                position: 'sticky',
                bottom: 20,
                zIndex: 1000,
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;