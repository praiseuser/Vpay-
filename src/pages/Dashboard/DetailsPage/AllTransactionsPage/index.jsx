import React, { useState } from 'react';
import { Box, Chip, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';

const AllTransactionsPage = ({ userId }) => {
    const allTransactions = [
        { id: 'TXN-2024-0001', date: 'Oct 22, 2024', amount: 25000, type: 'Airtime', status: 'Successful' },
        { id: 'TXN-2024-0002', date: 'Oct 28, 2024', amount: 10500, type: 'Data', status: 'Pending' },
        { id: 'TXN-2024-0003', date: 'Nov 2, 2024', amount: 7800, type: 'Electricity', status: 'Failed' },
        { id: 'TXN-2024-0004', date: 'Nov 3, 2024', amount: 42000, type: 'Airtime', status: 'Successful' },
        { id: 'TXN-2024-0005', date: 'Nov 4, 2024', amount: 15600, type: 'Data', status: 'Successful' },
        { id: 'TXN-2024-0006', date: 'Nov 5, 2024', amount: 30200, type: 'Electricity', status: 'Successful' },
        { id: 'TXN-2024-0007', date: 'Nov 6, 2024', amount: 5000, type: 'Airtime', status: 'Pending' },
        { id: 'TXN-2024-0008', date: 'Nov 7, 2024', amount: 18900, type: 'Data', status: 'Successful' },
    ];

    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const filteredTransactions = allTransactions.filter((t) => {
        return (
            (filterType ? t.type === filterType : true) &&
            (filterStatus ? t.status === filterStatus : true)
        );
    });

    const columns = [
        { id: 'id', label: 'TRANSACTION ID', minWidth: 140 },
        { id: 'date', label: 'DATE', minWidth: 120 },
        { id: 'type', label: 'TYPE', minWidth: 120 },
        { id: 'amount', label: 'AMOUNT', minWidth: 100 },
        { id: 'status', label: 'STATUS', minWidth: 120 },
    ];

    const rows = filteredTransactions.map((t) => ({
        id: t.id,
        date: t.date,
        type: t.type,
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

    const tableTitle = (
        <Box>
            <Typography
                sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: '#0F172A' }}
            >
                All Transactions
            </Typography>
            <Typography
                sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, color: '#64748B' }}
            >
                Complete transaction history for User: {userId}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ minHeight: '100vh', borderRadius: '16px', p: 1 }}>
            <Box sx={{ bgcolor: 'white', borderRadius: '16px', p: 3, boxShadow: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        width: '100%'
                    }}
                >
                    <Box>
                        <Typography
                            sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: '#0F172A' }}
                        >
                            All Transactions
                        </Typography>
                        <Typography
                            sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, color: '#64748B' }}
                        >
                            Complete transaction history for User: {userId}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl size="small">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={filterType}
                                label="Type"
                                onChange={(e) => setFilterType(e.target.value)}
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Airtime">Airtime</MenuItem>
                                <MenuItem value="Data">Data</MenuItem>
                                <MenuItem value="Electricity">Electricity</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filterStatus}
                                label="Status"
                                onChange={(e) => setFilterStatus(e.target.value)}
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Successful">Successful</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Failed">Failed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <CustomTable
                    columns={columns}
                    rows={rows}
                    showPagination
                    showSearch={false}
                />
            </Box>
        </Box>
    );
};

export default AllTransactionsPage;