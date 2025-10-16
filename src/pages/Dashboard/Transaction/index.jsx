import { useState } from 'react';
import { Box, TextField, MenuItem, Chip, Typography } from '@mui/material';
import CustomTable from '../../../components/CustomTable';
import { styled } from '@mui/material/styles';
import { transactionStyles } from './style';
import useFetchTransactions from '../../../Hooks/useTransactions';
import CustomLoader from '../../../components/CustomLoader';

const StyledTableCell = styled('span')(({ theme }) => transactionStyles.styledTableCell);

const Transaction = () => {
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const { transactions, loading, error } = useFetchTransactions();

  const filteredTransactions = transactions.filter((transaction) => {
    const typeMatch = filterType === 'All' || transaction.transaction_data.currencyType === filterType;
    const categoryMatch = filterCategory === 'All' || transaction.transaction_data.service === filterCategory;
    return typeMatch && categoryMatch;
  });

  const formatRows = (data) =>
    data.map((item, index) => ({
      id: <StyledTableCell className="table-text font-weight-600">{index + 1}</StyledTableCell>,
      service: <StyledTableCell className="table-text font-weight-400">{item.transaction_data.service}</StyledTableCell>,
      provider: <StyledTableCell className="table-text font-weight-400">{item.transaction_data.provider}</StyledTableCell>,
      amount: <StyledTableCell className="table-text font-weight-400">{`${item.transaction_data.currency} ${item.transaction_data.amount}`}</StyledTableCell>,
      status: (
        <StyledTableCell>
          <Chip
            label={item.transaction_data.status}
            color={item.transaction_data.status === 'success' ? 'success' : 'default'}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </StyledTableCell>
      ),
      createdAt: <StyledTableCell className="table-text font-weight-400">{item.created_at}</StyledTableCell>,
    }));

  const columns = [
    { id: 'id', label: 'S/N', minWidth: 70 },
    { id: 'service', label: 'SERVICE', minWidth: 150 },
    { id: 'provider', label: 'PROVIDER', minWidth: 150 },
    { id: 'amount', label: 'AMOUNT', minWidth: 120 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'createdAt', label: 'CREATED AT', minWidth: 150 },
  ];

  const rows =
    !loading && filteredTransactions.length === 0
      ? [
        {
          id: (
            <StyledTableCell
              colSpan={columns.length}
              sx={{
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography color="textSecondary" variant="body1">
                {error || 'No transactions data available'}
              </Typography>
            </StyledTableCell>
          ),
        },
      ]
      : formatRows(filteredTransactions);

  return (
    <Box sx={{ p: 0 }}>
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
          <MenuItem value="mobile data">Mobile Data</MenuItem>
          <MenuItem value="cable tv">Cable TV</MenuItem>
          <MenuItem value="electricity">Electricity</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ position: 'relative', minHeight: '200px' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '72%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          >
            <CustomLoader />
          </Box>
        )}
        <CustomTable
          columns={columns}
          rows={rows}
          showAddButton={false}
          sx={{ '& .MuiTableCell-root': { padding: '12px' }, opacity: loading ? 0.5 : 1 }}
        />
      </Box>
    </Box>
  );
};

export default Transaction;

