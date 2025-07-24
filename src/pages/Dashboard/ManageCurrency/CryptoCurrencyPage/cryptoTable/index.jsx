import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../../../../../components/CustomTable';
import { tableTitleStyle } from '../cryptoStyles';
import { formatRows } from '../data/cryptoUtils';
import { Box } from '@mui/material';

const CryptoTable = ({ cryptoData, onAddButtonClick, onEditClick, loading, activeTab, setActiveTab }) => {
  const columns = [
    { id: 'crypto_name', label: 'CRYPTO NAME', minWidth: 150 },
    { id: 'network', label: 'NETWORK', minWidth: 150 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  const rows = formatRows(cryptoData, onEditClick, loading);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CustomTable
        columns={columns}
        rows={rows}
        showAddButton
        addButtonTitle="Add Crypto"
        titleStyle={tableTitleStyle}
        onAddButtonClick={onAddButtonClick}
        tabLabels={['Crypto Currency', 'FIAT Currency']}
        activeTab={activeTab}
        onTabChange={(event, newValue) => setActiveTab(newValue)}
      />
    </Box>
  );
};

CryptoTable.propTypes = {
  cryptoData: PropTypes.arrayOf(
    PropTypes.shape({
      crypto_name: PropTypes.string.isRequired,
      network: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

CryptoTable.defaultProps = {
  cryptoData: [],
};

export default CryptoTable;