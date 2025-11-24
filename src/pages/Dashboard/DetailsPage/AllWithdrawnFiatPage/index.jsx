import React, { useState } from 'react';
import { Box, Typography, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';

const AllWithdrawnFiatPage = ({ userId }) => {
    // 💸 Sample Fiat Withdrawal Transactions
    const allTransactions = [
        { id: 1, type: 'Withdrawal', asset: 'NGN', amount: 40000, date: '2025-11-10 10:00', status: 'Completed' },
        { id: 2, type: 'Withdrawal', asset: 'USD', amount: 150, date: '2025-11-09 13:30', status: 'Pending' },
        { id: 3, type: 'Withdrawal', asset: 'GBP', amount: 100, date: '2025-11-08 18:20', status: 'Completed' },
        { id: 4, type: 'Withdrawal', asset: 'NGN', amount: 90000, date: '2025-11-07 09:45', status: 'Completed' },
    ];

    const [filterAsset, setFilterAsset] = useState('');
    const filteredTransactions = allTransactions.filter((t) =>
        filterAsset ? t.asset === filterAsset : true
    );

    const columns = [
        { id: 'id', label: 'S/N', minWidth: 50 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'asset', label: 'Currency', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 120 },
        { id: 'date', label: 'Date', minWidth: 150 },
        { id: 'status', label: 'Status', minWidth: 120 },
    ];

    const rows = filteredTransactions.map((tx, index) => ({
        id: index + 1,
        type: tx.type,
        asset: tx.asset,
        amount:
            tx.asset === 'USD'
                ? `$${tx.amount.toLocaleString()}`
                : tx.asset === 'GBP'
                    ? `£${tx.amount.toLocaleString()}`
                    : `₦${tx.amount.toLocaleString()}`,
        date: tx.date,
        status: (
            <Chip
                label={tx.status}
                size="small"
                sx={{
                    bgcolor:
                        tx.status === 'Completed'
                            ? '#DCFCE7'
                            : tx.status === 'Pending'
                                ? '#FEF3C7'
                                : '#FEE2E2',
                    color:
                        tx.status === 'Completed'
                            ? '#16A34A'
                            : tx.status === 'Pending'
                                ? '#B45309'
                                : '#DC2626',
                    fontWeight: 600,
                    fontSize: '12px',
                }}
            />
        ),
    }));

    return (
        <Box sx={{ minHeight: '100vh', borderRadius: '16px', p: 1 }}>
            <Box sx={{ bgcolor: 'white', borderRadius: '16px', p: 3, boxShadow: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            fontSize: 18,
                            color: '#0F172A',
                        }}
                    >
                        All Withdrawn Fiat Transactions
                    </Typography>

                    <FormControl size="small">
                        <InputLabel>Currency</InputLabel>
                        <Select
                            value={filterAsset}
                            label="Currency"
                            onChange={(e) => setFilterAsset(e.target.value)}
                            sx={{ minWidth: 110 }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="NGN">NGN</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <CustomTable columns={columns} rows={rows} showPagination showSearch={false} />
            </Box>
        </Box>
    );
};

export default AllWithdrawnFiatPage;
