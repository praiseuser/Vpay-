import { useState } from 'react';
import { Box, TextField, MenuItem, Chip } from '@mui/material';
import CustomTable from '../../../components/CustomTable';
import { styled } from '@mui/material/styles';
import { transactionStyles } from './style';

const StyledTableCell = styled('span')(({ theme }) => transactionStyles.styledTableCell);

const Transaction = () => {
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const dummyTransactions = [
    { id: 1, type: 'fiat', category: 'airtime', amount: 500, date: '2025-06-20', status: true },
    { id: 2, type: 'crypto', category: 'data', amount: 0.05, date: '2025-06-21', status: false },
    { id: 3, type: 'fiat', category: 'bills', amount: 1200, date: '2025-06-22', status: true },
    { id: 4, type: 'crypto', category: 'transfer', amount: 0.1, date: '2025-06-23', status: true },
    { id: 5, type: 'fiat', category: 'airtime', amount: 300, date: '2025-06-19', status: false },
    { id: 6, type: 'crypto', category: 'bills', amount: 0.02, date: '2025-06-18', status: true },
  ];

  const filteredTransactions = dummyTransactions.filter((transaction) => {
    const typeMatch = filterType === 'All' || transaction.type === filterType;
    const categoryMatch = filterCategory === 'All' || transaction.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  const formatRows = (data) =>
    data.map((item) => ({
      id: <StyledTableCell className="table-text font-weight-600">{item.id}</StyledTableCell>,
      type: <StyledTableCell className="table-text font-weight-400">{item.type.toUpperCase()}</StyledTableCell>,
      category: <StyledTableCell className="table-text font-weight-400">{item.category}</StyledTableCell>,
      amount: (
        <StyledTableCell className="table-text font-weight-400">
          {item.amount} {item.type === 'fiat' ? 'NGN' : 'BTC'}
        </StyledTableCell>
      ),
      date: <StyledTableCell className="table-text font-weight-400">{item.date}</StyledTableCell>,
      status: (
        <StyledTableCell>
          <Chip
            label={item.status ? 'Active' : 'Inactive'}
            color={item.status ? 'success' : 'default'}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </StyledTableCell>
      ),
    }));

  const columns = [
    { id: 'id', label: 'ID', minWidth: 70 },
    { id: 'type', label: 'TYPE', minWidth: 120 },
    { id: 'category', label: 'CATEGORY', minWidth: 150 },
    { id: 'amount', label: 'AMOUNT', minWidth: 150 },
    { id: 'date', label: 'DATE', minWidth: 150 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
  ];

  return (
    <Box sx={{ p: 1, backgroundColor: 'whitesmoke' }}>
      <Box sx={transactionStyles.filterContainer}>
        <TextField
          select
          label="Transaction Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{
            minWidth: 180,
            mr: 2,
            backgroundColor: '#fff',
            '& .MuiInputBase-root': {
              height: 40,
              fontSize: 14,
              borderRadius: 1,
            },
            '& .MuiInputLabel-root': {
              fontSize: 14,
            },
          }}
        >
          <MenuItem value="All">All Types</MenuItem>
          <MenuItem value="fiat">Fiat</MenuItem>
          <MenuItem value="crypto">Crypto</MenuItem>
        </TextField>

        <TextField
          select
          label="Transaction Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{
            minWidth: 180,
            backgroundColor: '#fff',
            '& .MuiInputBase-root': {
              height: 40,
              fontSize: 14,
              borderRadius: 1,
            },
            '& .MuiInputLabel-root': {
              fontSize: 14,
            },
          }}
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="airtime">Airtime</MenuItem>
          <MenuItem value="data">Data</MenuItem>
          <MenuItem value="bills">Bills</MenuItem>
          <MenuItem value="transfer">Transfer</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      <CustomTable
        columns={columns}
        rows={formatRows(filteredTransactions)}
        showAddButton={false}
        sx={{ '& .MuiTableCell-root': { padding: '12px' } }}
      />
    </Box>
  );
};

export default Transaction;
