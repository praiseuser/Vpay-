import { Box } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';

const CryptoRate = ({ rates, onAddButtonClick }) => {
  const filteredRows = rates.filter((item) =>
    ['BTC', 'BNB', 'ETH'].some((crypto) => item.Currency_Id.includes(crypto))
  );

  const formatRows = (data) =>
    data.map((item) => ({
      currency: <span className="table-text font-weight-700">{item.Currency_Id}</span>,
      rate: <span className="table-text font-weight-500">{item.Rate}</span>,
      status: <span className="table-text font-weight-400">{item.status === 1 ? 'Enabled' : 'Disabled'}</span>,
      action: (
        <div className="table-action">
          <CustomButton type="edit" />
        </div>
      ),
    }));

  const columns = [
    { id: 'currency', label: 'CURRENCY', minWidth: 150 },
    { id: 'rate', label: 'RATE', minWidth: 180 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  return (
    <Box
     
    >
      <CustomTable
        columns={columns}
        rows={formatRows(filteredRows)}
        showAddButton
        addButtonTitle="Create Rate"
        addButtonStyle={{ marginTop: '40px' }}
        searchPlaceholder="search"
        onAddButtonClick={onAddButtonClick}
      />
    </Box>
  );
};

export default CryptoRate;