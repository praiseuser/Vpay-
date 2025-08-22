import { Typography, Box, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import BouncingLoader from '../../../../components/BouncingLoader';

function FeeTable({
  fees,
  fetchLoading,
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
    <Box sx={{ position: 'relative', minHeight: '300px' }}> 
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
                  onEditFee(fee);
                }}
                disabled={fetchLoading}
              />
              <CustomButton
                type="delete"
                onClick={() => {
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
        searchPlaceholder="search"
        onAddButtonClick={onAddFeeClick}
      />
      {fetchLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '65%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            marginTop: '20px', 
          }}
        >
          <BouncingLoader />
        </Box>
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