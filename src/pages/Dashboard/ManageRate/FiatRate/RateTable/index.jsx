import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, CircularProgress } from '@mui/material';
import CustomTable from '../../../../../components/CustomTable';
import CustomButton from '../../../../../components/CustomButton';

const RateTable = ({
  rateCurrencies,
  isRateLoading,
  activeRateId,
  viewLoading,
  onAddButtonClick,
  onDelete,
  onEdit,
  onView,
}) => {
  const formatRows = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((item, index) => ({
      sno: <span className="table-text font-weight-500">{index + 1}</span>,
      currency: (
        <Box>
          <span className="table-text font-weight-700">{item.fiat_currency_code}</span>
        </Box>
      ),
      rate: <span className="table-text font-weight-500">{item.rate || 'N/A'}</span>,
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
          <CustomButton type="edit" onClick={() => onEdit(item)} />
          <CustomButton
            type="delete"
            onClick={() => onDelete(item.id)}
            disabled={isRateLoading(item.id)}
            icon={isRateLoading(item.id) ? <CircularProgress size={20} /> : null}
          />
          <CustomButton
            type="view"
            onClick={() => onView(item.id)}
            loading={viewLoading && activeRateId === item.id}
          />
        </Box>
      ),
    }));
  };

  const columns = [
    { id: 'sno', label: 'S/N', minWidth: 60 },
    { id: 'currency', label: 'CURRENCY', minWidth: 150 },
    { id: 'rate', label: 'RATE', minWidth: 180 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  return (
    <CustomTable
      columns={columns}
      rows={formatRows(rateCurrencies)}
      showAddButton
      addButtonTitle="Create Rate"
      addButtonStyle={{ marginTop: '40px' }}
      searchPlaceholder="search"
      onAddButtonClick={onAddButtonClick}
    />
  );
};

RateTable.propTypes = {
  rateCurrencies: PropTypes.array.isRequired,
  isRateLoading: PropTypes.func.isRequired,
  activeRateId: PropTypes.string,
  viewLoading: PropTypes.bool.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default RateTable;
