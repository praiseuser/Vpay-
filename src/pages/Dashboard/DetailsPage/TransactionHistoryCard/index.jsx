import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { cardContainer, titleStyle } from './styles';
import CustomTable from '../../../../components/CustomTable';

const TransactionHistoryCard = ({ userId, onViewAllTransactions }) => {
  const transactions = [
    { id: 'TXN-2024-0001', date: 'Oct 22, 2024', amount: 25000, status: 'Successful' },
    { id: 'TXN-2024-0002', date: 'Oct 28, 2024', amount: 10500, status: 'Pending' },
    { id: 'TXN-2024-0003', date: 'Nov 2, 2024', amount: 7800, status: 'Failed' },
    { id: 'TXN-2024-0004', date: 'Nov 3, 2024', amount: 42000, status: 'Successful' },
    { id: 'TXN-2024-0005', date: 'Nov 4, 2024', amount: 15600, status: 'Successful' },
  ];

  const columns = [
    { id: 'id', label: 'TRANSACTION ID', minWidth: 140 },
    { id: 'date', label: 'DATE', minWidth: 120 },
    { id: 'amount', label: 'AMOUNT', minWidth: 100 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
  ];

  const rows = transactions.map(t => ({
    id: t.id,
    date: t.date,
    amount: `₦${t.amount.toLocaleString()}`,
    status: (
      <Chip
        label={t.status}
        size="small"
        sx={{
          bgcolor:
            t.status === 'Successful'
              ? '#DCFCE7'
              : t.status === 'Pending'
                ? '#FEF3C7'
                : '#FEE2E2',
          color:
            t.status === 'Successful'
              ? '#16A34A'
              : t.status === 'Pending'
                ? '#B45309'
                : '#DC2626',
          fontWeight: 600,
          fontSize: '12px',
        }}
      />
    ),
  }));

  const handleViewAll = () => {
    onViewAllTransactions(userId);
  };

  return (
    <Box sx={{ ...cardContainer, p: 3 }}>
      <Box sx={{ ...titleStyle, mb: 2 }}>TRANSACTION HISTORY</Box>

      <CustomTable columns={columns} rows={rows}
        showSearch={false}
        showPagination={false}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#1E88E5',
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            py: 0.7,
            fontSize: '13px',
            '&:hover': { bgcolor: '#1565C0' },
          }}
          onClick={handleViewAll}
        >
          View All
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionHistoryCard;
