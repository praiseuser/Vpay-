import React from 'react';
import { Box } from '@mui/material';
import {
    cardContainer,
    titleStyle,
    gridContainer,
    labelStyle,
    valueStyle,
} from './styles';

const ActivityLogsCard = () => {
    const logs = [
        {
            action: 'Logged in',
            date: 'Nov 2, 2024',
            time: '10:32 AM',
            status: 'Successful',
        },
        {
            action: 'Updated Profile',
            date: 'Oct 28, 2024',
            time: '4:45 PM',
            status: 'Successful',
        },
        {
            action: 'Password Change Attempt',
            date: 'Oct 20, 2024',
            time: '8:15 PM',
            status: 'Failed',
        },
    ];

    return (
        <Box sx={cardContainer}>
            <Box sx={titleStyle}>ACTIVITY LOGS</Box>

            <Box sx={gridContainer}>
                {logs.map((log, index) => (
                    <Box key={index}>
                        <Box sx={labelStyle}>ACTION</Box>
                        <Box sx={valueStyle}>{log.action}</Box>

                        <Box sx={labelStyle}>DATE</Box>
                        <Box sx={valueStyle}>{log.date}</Box>

                        <Box sx={labelStyle}>TIME</Box>
                        <Box sx={valueStyle}>{log.time}</Box>

                        <Box sx={labelStyle}>STATUS</Box>
                        <Box
                            sx={{
                                ...valueStyle,
                                mb: 0,
                                color:
                                    log.status === 'Successful'
                                        ? '#16A34A'
                                        : log.status === 'Failed'
                                            ? '#DC2626'
                                            : '#17181A',
                            }}
                        >
                            {log.status}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ActivityLogsCard;
