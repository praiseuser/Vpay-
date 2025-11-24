import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';

const AllCryptoPage = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions([
            {
                id: 1,
                asset: 'Bitcoin (BTC)',
                type: 'Deposit',
                amount: 0.01,
                valueUSD: 1000,
                date: '2025-11-10 12:30',
                status: 'Completed',
            },
            {
                id: 2,
                asset: 'Bitcoin (BTC)',
                type: 'Withdrawal',
                amount: 0.005,
                valueUSD: 500,
                date: '2025-11-09 15:45',
                status: 'Pending',
            },
        ]);
    }, [userId]);

    const columns = [
        { id: 'id', label: 'S/N', minWidth: 50 },
        { id: 'asset', label: 'Asset', minWidth: 120 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        { id: 'valueUSD', label: 'Value (USD)', minWidth: 120 },
        { id: 'date', label: 'Date', minWidth: 150 },
        { id: 'status', label: 'Status', minWidth: 100 },
    ];

    const rowsWithChips = transactions.map(tx => ({
        ...tx,
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
                <Typography>No crypto transactions found for this user.</Typography>
            ) : (
                <CustomTable
                    columns={columns}
                    rows={rowsWithChips}
                    title={
                        <Typography sx={{ fontSize: 18, color: '#000', fontWeight: 600 }}>
                            Bitcoin Transactions
                        </Typography>
                    }
                    titleInsideTable={true}
                    showSearch={false}
                />
            )}
        </Box>
    );
};

export default AllCryptoPage;
