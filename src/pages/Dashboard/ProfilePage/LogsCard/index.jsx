import React from 'react';
import { Box, Card, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LogsCard = ({ logs, logFilter, setLogFilter, logsCardStyles, headerBarStyles, sectionTitleStyles, logsContainerStyles, logItemStyles, logDotStyles, logTextStyles, logTimestampStyles }) => {
  const filteredLogs = logFilter === 'All' ? logs : logs.filter((log) => log.type === logFilter);

  return (
    <Card sx={logsCardStyles}>
      <Box sx={headerBarStyles} />
      <Typography sx={sectionTitleStyles}>Recent Activity Logs</Typography>
      <FormControl sx={{ mb: 2, minWidth: 150 }}>
        <InputLabel>Filter Logs</InputLabel>
        <Select
          value={logFilter}
          onChange={(e) => setLogFilter(e.target.value)}
          label="Filter Logs"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Login">Logins</MenuItem>
          <MenuItem value="Update">Updates</MenuItem>
          <MenuItem value="Settings">Settings Changes</MenuItem>
          <MenuItem value="Review">Reviews</MenuItem>
          <MenuItem value="Logout">Logouts</MenuItem>
          <MenuItem value="Revised">Revised</MenuItem>
        </Select>
      </FormControl>
      <Box sx={logsContainerStyles}>
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <Box key={index} sx={logItemStyles}>
              <Box sx={logDotStyles} />
              <Typography sx={logTextStyles}>{log.action}</Typography>
              <Typography sx={logTimestampStyles}>{log.timestamp}</Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#666', textAlign: 'center' }}>
            No logs found for this filter.
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default LogsCard;