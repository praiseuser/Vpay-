import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../../../../../components/CustomTable';
import { tableTitleStyle } from '../fiatStyles';
import { formatRows } from '../data/fiatUtils';

const FiatTable = ({ fiatData, handleEditClick, onAddButtonClick, loading, activeTab, setActiveTab }) => {
  const columns = [
    { id: 'sn', label: 'S/N', minWidth: 50 },
    { id: 'fiat_currency_name', label: 'FIAT CURRENCY NAME', minWidth: 150 },
    { id: 'fiat_currency_code', label: 'FIAT CURRENCY CODE', minWidth: 150 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: 'ACTION', minWidth: 150 },
  ];

  const rows = formatRows(fiatData, handleEditClick, loading);

  return (
    <CustomTable
      columns={columns}
      rows={rows}
      showAddButton={true}
      showFilterButton={true}
      showFilterStyle={{ marginTop: '40px' }}
      addButtonTitle="Add FIAT"
      addButtonStyle={{}}
      title="Manage Fiat"
      titleStyle={tableTitleStyle}
      searchPlaceholder="Search fiat..."
      onAddButtonClick={onAddButtonClick}
      tabLabels={['Crypto Currency', 'FIAT Currency']}
      activeTab={activeTab}
      onTabChange={(event, newValue) => setActiveTab(newValue)}
    />
  );
};


FiatTable.propTypes = {
  fiatData: PropTypes.arrayOf(
    PropTypes.shape({
      Fiat_Currency: PropTypes.string.isRequired,
      status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  handleEditClick: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

FiatTable.defaultProps = {
  fiatData: [],
};

export default FiatTable;