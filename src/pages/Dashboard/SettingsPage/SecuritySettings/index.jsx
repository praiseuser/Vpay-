import React, { useState } from 'react';
import { Box, Card, Typography, FormControlLabel, Switch, TextField, Button, IconButton } from '@mui/material';
import { Lock, Copy, Trash2 } from 'lucide-react';

const SecuritySettings = ({ cardStyles, headerBarStyles, sectionTitleStyles, labelStyles, textFieldStyles, switchLabelStyles, buttonStyles, sessionItemStyles, sessionTextStyles, sessionSubTextStyles, apiKeyItemStyles, apiKeyTextStyles, settings, setSettings }) => {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, key: 'api-1234-5678-9012-3456' },
    { id: 2, key: 'api-9876-5432-1098-7654' },
  ]);

  const handle2FAToggle = (e) => {
    setSettings((prev) => ({ ...prev, twoFactorAuth: e.target.checked }));
  };

  const handleIPChange = (e) => {
    setSettings((prev) => ({ ...prev, ipWhitelist: e.target.value }));
  };

  const handleSignOutSession = (sessionId) => {
    setSettings((prev) => ({
      ...prev,
      activeSessions: prev.activeSessions.filter((session) => session.id !== sessionId),
    }));
  };

  const handleGenerateApiKey = () => {
    const newKey = `api-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`;
    setApiKeys([...apiKeys, { id: apiKeys.length + 1, key: newKey }]);
  };

  const handleCopyApiKey = (key) => {
    navigator.clipboard.writeText(key);
    alert('API Key copied to clipboard!');
  };

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={headerBarStyles} />
      <Typography sx={sectionTitleStyles}>
        <Lock size={20} /> Security Settings
      </Typography>
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={settings.twoFactorAuth} onChange={handle2FAToggle} />}
          label="Enable Two-Factor Authentication"
          sx={switchLabelStyles}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>IP Whitelisting</Typography>
        <TextField
          placeholder="Enter IP Address"
          value={settings.ipWhitelist}
          onChange={handleIPChange}
          sx={textFieldStyles}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>Active Sessions</Typography>
        {settings.activeSessions.map((session) => (
          <Box key={session.id} sx={sessionItemStyles}>
            <Box>
              <Typography sx={sessionTextStyles}>{session.device}</Typography>
              <Typography sx={sessionSubTextStyles}>
                {session.browser} • {session.location} • Last active: {session.lastActive}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => handleSignOutSession(session.id)}
              sx={buttonStyles.outlined}
            >
              Sign Out
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelStyles}>API Key Management</Typography>
        {apiKeys.map((key) => (
          <Box key={key.id} sx={apiKeyItemStyles}>
            <Typography sx={apiKeyTextStyles}>{key.key}</Typography>
            <Box>
              <IconButton onClick={() => handleCopyApiKey(key.key)}>
                <Copy size={16} color="#02042D" />
              </IconButton>
              <IconButton onClick={() => handleDeleteApiKey(key.id)}>
                <Trash2 size={16} color="#FF4D4F" />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={handleGenerateApiKey}
          sx={buttonStyles.contained}
        >
          Generate New Key
        </Button>
      </Box>
    </Card>
  );
};

export default SecuritySettings;