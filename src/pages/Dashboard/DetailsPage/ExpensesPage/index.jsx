import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from '@mui/material';

const dummyExpenses = [
    { id: 1, category: 'Airtime Purchase', amount: '$15.00', date: '2025-10-29', status: 'Successful' },
    { id: 2, category: 'Data Bundle', amount: '$25.00', date: '2025-10-27', status: 'Successful' },
    { id: 3, category: 'Electricity Bill', amount: '$45.50', date: '2025-10-24', status: 'Pending' },
    { id: 4, category: 'Cable TV Subscription', amount: '$30.00', date: '2025-10-20', status: 'Successful' },
    { id: 5, category: 'Internet Subscription', amount: '$60.00', date: '2025-10-18', status: 'Failed' },
    { id: 6, category: 'Water Bill', amount: '$20.00', date: '2025-10-12', status: 'Successful' },
];

const ExpensesPage = ({ userId }) => {
    return (
        <Box
            sx={{
                bgcolor: '#F8FAFC',
                borderRadius: '24px',
                p: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    color: '#17181A',
                    mb: 2,
                }}
            >
                Total withdrawer
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: '16px' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#EDE7FF' }}>
                            <TableCell sx={{ fontWeight: 600, color: '#5E35B1' }}>S/N</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#5E35B1' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#5E35B1' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#5E35B1' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#5E35B1' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {dummyExpenses.map((expense, index) => (
                            <TableRow
                                key={expense.id}
                                sx={{
                                    '&:hover': { backgroundColor: '#F3E5F5' },
                                    transition: '0.3s ease',
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{expense.category}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell>{expense.date}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={expense.status}
                                        size="small"
                                        sx={{
                                            bgcolor:
                                                expense.status === 'Successful'
                                                    ? '#C8E6C9'
                                                    : expense.status === 'Pending'
                                                        ? '#FFF9C4'
                                                        : '#FFCDD2',
                                            color:
                                                expense.status === 'Successful'
                                                    ? '#2E7D32'
                                                    : expense.status === 'Pending'
                                                        ? '#F9A825'
                                                        : '#C62828',
                                            fontWeight: 500,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ExpensesPage;
