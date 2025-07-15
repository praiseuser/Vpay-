import CustomTable from '../../../components/CustomTable';
import { useState, useEffect } from 'react';
import { Box, Chip, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled('span')(({ theme }) => ({
  fontFamily: 'Mada',
  '&.table-text': {
    color: '#888B93',
    '&.font-weight-600': { fontWeight: 600 },
    '&.font-weight-400': { fontWeight: 400 },
    '&.font-weight-300': { fontWeight: 300 },
  },
}));

const BillProvider = () => {
  const [filter, setFilter] = useState('');
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const dummyRates = [
      {
        providerName: 'PHCN',
        billPayments: 1234,
        revenue: '₦2,658,255',
        revenueChange: -2.3,
        averagePayment: 5000,
        pendingBills: 10,
        status: 'Active',
      },
      {
        providerName: 'DSTV',
        billPayments: 876,
        revenue: '₦1,800,300',
        revenueChange: 1.5,
        averagePayment: 4500,
        pendingBills: 45,
        status: 'Pending',
      },
      {
        providerName: 'Water Corp',
        billPayments: 1500,
        revenue: '₦3,500,200',
        revenueChange: 3.2,
        averagePayment: 6000,
        pendingBills: 5,
        status: 'Active',
      },
    ];
    setProviders(dummyRates);
  }, []);

  const formatRows = (data) =>
    data.map((item) => ({
      providerName: (
        <StyledTableCell className="table-text font-weight-600">{item.providerName}</StyledTableCell>
      ),
      billPayments: (
        <StyledTableCell className="table-text font-weight-400">{item.billPayments}</StyledTableCell>
      ),
      revenue: (
        <StyledTableCell className="table-text font-weight-400">
          {item.revenue}{' '}
          <span style={{ color: item.revenueChange > 0 ? '#28a745' : '#dc3545' }}>
            {item.revenueChange}%
          </span>
        </StyledTableCell>
      ),
      averagePayment: (
        <StyledTableCell className="table-text font-weight-400">
          ₦{item.averagePayment.toLocaleString()}
        </StyledTableCell>
      ),
      pendingBills: (
        <StyledTableCell className="table-text font-weight-400">
          {item.pendingBills}
        </StyledTableCell>
      ),
      status: (
        <Chip
          label={item.status}
          size="small"
          sx={{
            color:
              item.status === 'Active'
                ? '#28a745'
                : item.status === 'Pending'
                ? '#ffc107'
                : '#dc3545',
            backgroundColor:
              item.status === 'Active'
                ? 'rgba(40, 167, 69, 0.2)'
                : item.status === 'Pending'
                ? 'rgba(255, 193, 7, 0.2)'
                : 'rgba(220, 53, 69, 0.2)',
            fontWeight: 400,
          }}
        />
      ),
    }));

  const columns = [
    { id: 'providerName', label: 'BILL PROVIDER', minWidth: 170 },
    { id: 'billPayments', label: 'BILL PAYMENTS', minWidth: 200 },
    { id: 'revenue', label: 'REVENUE (NGN)', minWidth: 200 },
    { id: 'averagePayment', label: 'AVERAGE PAYMENT', minWidth: 200 },
    { id: 'pendingBills', label: 'PENDING BILLS', minWidth: 140 },
    { id: 'status', label: 'STATUS', minWidth: 140 },
  ];

  const filteredRates = providers.filter((item) =>
    !filter || item.providerName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 1, backgroundColor: 'whitesmoke' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter bill providers' }}
            sx={{
              borderRadius: '8px',
              backgroundColor: '#fff',
              '& .MuiSelect-select': { padding: '8px' },
            }}
          >
            <MenuItem value="">
              <em>All Bill Providers</em>
            </MenuItem>
            <MenuItem value="PHCN">PHCN</MenuItem>
            <MenuItem value="DSTV">DSTV</MenuItem>
            <MenuItem value="Water Corp">Water Corp</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <CustomTable
        columns={columns}
        rows={formatRows(filteredRates)}
        searchPlaceholder="search"
        sx={{ '& .MuiTableCell-root': { padding: '12px' } }}
      />
    </Box>
  );
};

export default BillProvider;
