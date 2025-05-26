import { Typography, CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import { Chip } from '@mui/material';

function FeeTable({
  fees,
  fetchLoading,
  fetchError,
  deleteError,
  successMessage,
  isFeeLoading,
  onAddFeeClick,
  onEditFee,
  onDeleteFee,
}) {
  const columns = [
    { id: 'fee_name', label: 'FEE NAME', minWidth: 150 },
    { id: 'fee_type', label: 'FEE TYPE', minWidth: 150 },
    { id: 'fee_amount', label: 'FEE AMOUNT', minWidth: 150 },
    { id: 'status', label: 'STATUS', minWidth: 100 },
    { id: 'has_max_limit', label: 'HAS MAX LIMIT', minWidth: 150 },
    { id: 'max_limit', label: 'MAX LIMIT', minWidth: 150 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  const rowStyle = {
    fontFamily: 'Raleway, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.3%',
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CustomTable
        columns={columns}
        rows={fees.map((fee) => ({
          fee_name: fee.fee_name || 'N/A',
          fee_type: fee.fee_type || 'N/A',
          fee_amount: fee.fee_amount ? `${fee.fee_amount}%` : 'N/A',
          status: (
            <Chip
              label={fee.status === '1' || fee.status === true ? 'Enabled' : 'Disabled'}
              color={fee.status === '1' || fee.status === true ? 'success' : 'default'}
              variant="outlined"
              size="small"
              style={{
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
              }}
            />
          ),
          has_max_limit: fee.has_max_limit ? 'Yes' : 'No',
          max_limit: fee.max_limit || 'N/A',
          action: (
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
              <CustomButton
                type="edit"
                onClick={() => {
                  console.log('Edit button clicked for fee:', fee);
                  onEditFee(fee);
                }}
                disabled={fetchLoading}
              />
              <CustomButton
                type="delete"
                onClick={() => {
                  console.log('Delete button clicked for fee:', fee);
                  onDeleteFee(fee.id);
                }}
                loading={isFeeLoading(fee.id)} 
                disabled={fetchLoading || isFeeLoading(fee.id)}
              />
            </div>
          ),
        }))}
        rowStyle={rowStyle}
        showAddButton
        addButtonTitle="Add Fee"
        addButtonStyle={{ marginTop: '40px' }}
        title="Manage Fees"
        titleStyle={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '100%',
          letterSpacing: '0px',
          color: '#333333',
          marginLeft: '24px',
          marginBottom: '7px',
        }}
        searchPlaceholder="search"
        onAddButtonClick={onAddFeeClick}
      />
      {fetchLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '70%',
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
      {fetchError && (
        <Typography align="center" color="error" sx={{ mt: 2 }}>
          {fetchError}
        </Typography>
      )}
      {successMessage && (
        <Typography align="center" color="success.main" sx={{ mt: 2 }}>
          {successMessage}
        </Typography>
      )}
      {deleteError && (
        <Typography align="center" color="error" sx={{ mt: 2 }}>
          {deleteError}
        </Typography>
      )}
    </Box>
  );
}

FeeTable.propTypes = {
  fees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
      fee_name: PropTypes.string,
      fee_type: PropTypes.string,
      fee_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      status: PropTypes.oneOfType([PropTypes.string, PropTypes.boolean]),
      has_max_limit: PropTypes.boolean,
      max_limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  fetchLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.string,
  deleteError: PropTypes.string,
  successMessage: PropTypes.string,
  isFeeLoading: PropTypes.func.isRequired, 
  onAddFeeClick: PropTypes.func.isRequired,
  onEditFee: PropTypes.func.isRequired,
  onDeleteFee: PropTypes.func.isRequired,
};

export default FeeTable;