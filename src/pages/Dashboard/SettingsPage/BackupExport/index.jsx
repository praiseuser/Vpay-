import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { Download } from 'lucide-react';

const BackupExport = ({ cardStyles, headerBarStyles, sectionTitleStyles, backupTextStyles, buttonStyles }) => {
  const handleBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      settings: {  },
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-${backupData.timestamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={headerBarStyles} />
      <Typography sx={sectionTitleStyles}>
        <Download size={20} /> Backup and Export
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography sx={backupTextStyles}>Last Backup: April 23, 2025, 10:00 AM</Typography>
        <Button
          variant="contained"
          onClick={handleBackup}
          sx={buttonStyles.contained}
        >
          Download Backup
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={backupTextStyles}>Export user data and logs as JSON.</Typography>
        <Button
          variant="outlined"
          onClick={handleBackup}
          sx={buttonStyles.outlined}
        >
          Export Data
        </Button>
      </Box>
    </Card>
  );
};

export default BackupExport;