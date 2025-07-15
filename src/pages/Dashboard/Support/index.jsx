import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomTable from '../../../components/CustomTable';

const Support = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const tickets = {
    0: [
      { id: 1, ticketId: 'TCK001', subject: 'Login Issue', status: 'Open', date: '2025-06-25', priority: 'High' },
      { id: 2, ticketId: 'TCK002', subject: 'Payment Failed', status: 'Open', date: '2025-06-24', priority: 'Medium' },
    ],
    1: [
      { id: 3, ticketId: 'TCK003', subject: 'Account Locked', status: 'Closed', date: '2025-06-23', priority: 'Low' },
    ],
    2: [
      { id: 4, ticketId: 'TCK004', subject: 'Feature Request', status: 'Answered', date: '2025-06-22', priority: 'Medium' },
    ],
  };

  const columns = [
    { id: 'ticketId', label: 'TICKET ID', minWidth: 100 },
    { id: 'subject', label: 'SUBJECT', minWidth: 200 },
    { id: 'status', label: 'STATUS', minWidth: 100 },
    { id: 'date', label: 'DATE', minWidth: 120 },
    { id: 'priority', label: 'PRIORITY', minWidth: 100 },
    { id: 'action', label: 'ACTION', minWidth: 150 },
  ];

  const rows = tickets[activeTab].map((ticket) => ({
    ...ticket,
    action: (
      <span
        style={{
          color: '#1976d2',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        View Details
      </span>
    ),
  }));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tabLabels = ['Open', 'Closed', 'Answered'];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <CustomTable
        columns={columns}
        rows={filteredRows}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        searchPlaceholder="Search tickets..."
        tabLabels={tabLabels}
        activeTab={activeTab}
        onTabChange={(e, newValue) => setActiveTab(newValue)}
      />
    </Box>
  );
};

export default Support;