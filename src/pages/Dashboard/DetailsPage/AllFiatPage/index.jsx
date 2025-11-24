import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';

const AllFiatPage = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions([
            {
                id: 1,
                asset: 'Nigerian Naira (NGN)',
                type: 'Deposit',
                amount: 500000,
                date: '2025-11-10 10:30',
                status: 'Completed',
            },
            {
                id: 2,
                asset: 'Nigerian Naira (NGN)',
                type: 'Withdrawal',
                amount: 250000,
                date: '2025-11-09 14:20',
                status: 'Pending',
            },
        ]);
    }, [userId]);

    const columns = [
        { id: 'id', label: 'S/N', minWidth: 50 },
        { id: 'asset', label: 'Asset', minWidth: 120 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 120 },
        { id: 'date', label: 'Date', minWidth: 150 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
        },
    ];

    const rowsWithChips = transactions.map(tx => ({
        ...tx,
        amount: tx.asset.includes('NGN') ? `₦${tx.amount.toLocaleString()}` : `$${tx.amount.toLocaleString()}`,
        status: (
            <Chip
                label={tx.status}
                variant="outlined"
                color={tx.status === 'Completed' ? 'success' : 'warning'}
                size="small"
            />
        )
    }));

    return (
        <Box>
            {transactions.length === 0 ? (
                <Typography>No fiat transactions found for this user.</Typography>
            ) : (
                <CustomTable
                    columns={columns}
                    rows={rowsWithChips}
                    title={
                        <Typography sx={{ fontSize: 18, color: '#000', fontWeight: 600 }}>
                            Fiat Transactions
                        </Typography>
                    }
                    titleInsideTable={true}
                    showSearch={false}
                />
            )}
        </Box>
    );
};

export default AllFiatPage;
