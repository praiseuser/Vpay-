import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import { useFetchRateCurrencies } from '../../../../Hooks/useRateCurrency';
import { useDeleteRate } from '../../../../Hooks/useRateCurrency';
import { Chip, Box, CircularProgress, Typography } from '@mui/material';

const FiatRate = ({ onAddButtonClick }) => {
  const { rateCurrencies, loading, error } = useFetchRateCurrencies();
  const { deleteRate, isRateLoading, error: deleteError, successMessage } = useDeleteRate();


  console.log('FiatRate - rateCurrencies:', rateCurrencies);

  const filteredRows = rateCurrencies.filter(
    (item) => !['BTC', 'BNB', 'ETH'].some((crypto) => item.Currency_Id.includes(crypto))
  );

  const handleDelete = async (id) => {
    if (!id) {
      console.error('FiatRate - handleDelete: No Currency_Id provided for item:', id);
      return;
    }
    console.log('FiatRate - handleDelete: Deleting rate with Currency_Id:', id);
    await deleteRate(id);
  };

  const formatRows = (data) =>
    data.map((item) => ({
      currency: <span className="table-text font-weight-700">{item.Currency_Id}</span>,
      rate: <span className="table-text font-weight-500">{item.Rate}</span>,
      status: (
        <Chip
          label={item.status === '1' || item.status === 1 ? 'Enabled' : 'Disabled'}
          color={item.status === '1' || item.status === 1 ? 'success' : 'default'}
          variant="outlined"
          size="small"
          sx={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}
        />
      ),
      action: (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomButton type="edit" />
          <CustomButton
            type="delete"
            onClick={() => handleDelete(item.Currency_Id)} // Use Currency_Id instead of item.id
            disabled={isRateLoading(item.Currency_Id)}
            icon={isRateLoading(item.Currency_Id) ? <CircularProgress size={20} /> : null}
          />
        </Box>
      ),
    }));

  const columns = [
    { id: 'currency', label: 'CURRENCY', minWidth: 150 },
    { id: 'rate', label: 'RATE', minWidth: 180 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <CustomTable
        columns={columns}
        rows={formatRows(filteredRows)}
        showAddButton
        addButtonTitle="Create Rate"
        addButtonStyle={{ marginTop: '40px' }}
        searchPlaceholder="search"
        onAddButtonClick={onAddButtonClick}
      />
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={30} />
        </Box>
      )}
      {error && (
        <Typography align="center" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {deleteError && (
        <Typography align="center" color="error" sx={{ mt: 2 }}>
          {deleteError}
        </Typography>
      )}
    </Box>
  );
};

export default FiatRate;