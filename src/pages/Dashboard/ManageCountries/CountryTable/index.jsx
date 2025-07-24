import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import { Box } from '@mui/material';
import { rowStyle, tableTitleStyle } from '../countryStyles';
import { useDeleteCountry, useFetchCountryCurrencies, useViewCountryById } from '../../../../Hooks/useCountryCurrency';
import CountryViewModal from '../CountryTable/CountryViewModal';

const CountryTable = ({ countryCurrencies: initialCurrencies, onAddButtonClick, loading: fetchLoading }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCountry, setModalCountry] = useState(null); 
  const { deleteCountry, loading: deleteLoading, error, success } = useDeleteCountry();
  const { countryCurrencies, loading: fetchLoadingFromHook, refetch } = useFetchCountryCurrencies();
  const { viewCountry, country: viewedCountry, loading: viewLoading, error: viewError } = useViewCountryById();

  const [currencies, setCurrencies] = useState(initialCurrencies || countryCurrencies);

  useEffect(() => {
    setCurrencies(initialCurrencies || countryCurrencies);
  }, [initialCurrencies, countryCurrencies]);

  useEffect(() => {
    if (viewId && !viewLoading) {
      viewCountry(viewId);
    }
  }, [viewId, viewLoading, viewCountry]);

  useEffect(() => {
    if (viewedCountry && !viewError && !viewLoading) {
      console.log('Setting modalCountry:', viewedCountry);
      setModalCountry(viewedCountry);
    } else if (viewError) {
      console.error(`Error viewing country with ID ${viewId}:`, viewError);
      setModalCountry(null);
    } else {
      console.log('viewedCountry is null or loading, not setting modalCountry yet');
    }
  }, [viewedCountry, viewError, viewLoading, viewId]);

  useEffect(() => {
    if (modalCountry) {
      console.log('Opening modal with modalCountry:', modalCountry);
      setModalOpen(true);
    }
  }, [modalCountry]);

  const columns = [
    { id: 'serial', label: 'S/N', minWidth: 80 },
    { id: 'currency', label: 'CURRENCY ID', minWidth: 150 },
    { id: 'country', label: 'COUNTRY NAME', minWidth: 150 },
    { id: 'code', label: 'COUNTRY CODE', minWidth: 150 },
    { id: 'dial_code', label: 'DIAL CODE', minWidth: 120 },
    { id: 'flag', label: 'COUNTRY FLAG', minWidth: 120 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  const formatRows = (data) =>
    data.map((item, index) => {
      const isDeleteLoading = deleteLoading && selectedId === item.id;
      const isViewLoading = viewLoading && viewId === item.id;
      console.log(`Delete button for ID ${item.id} - isDeleteLoading: ${isDeleteLoading}, deleteLoading: ${deleteLoading}, selectedId: ${selectedId}`);
      console.log(`View button for ID ${item.id} - isViewLoading: ${isViewLoading}, viewLoading: ${viewLoading}, viewId: ${viewId}`);
      return {
        serial: <span className="table-text font-weight-500">{index + 1}</span>,
        currency: <span className="table-text font-weight-700">{item.Currency_Id}</span>,
        country: <span className="table-text font-weight-400">{item.Country_name}</span>,
        code: <span className="table-text font-weight-400">{item.Country_code}</span>,
        dial_code: <span className="table-text font-weight-500">{item.Country_dial_code || 'N/A'}</span>,
        flag: <span className="table-text font-weight-500">{item.Country_Flag || 'N/A'}</span>,
        status: <CustomButton type={item.status === 'active' ? 'red' : 'green'} />,
        action: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative' }}>
            <CustomButton type="edit" />
            <CustomButton
              type="delete"
              onClick={() => setSelectedId(item.id)}
              loading={isDeleteLoading}
              disabled={fetchLoadingFromHook || fetchLoading}
            />
            <CustomButton
              type="view"
              onClick={() => setViewId(item.id)}
              loading={isViewLoading}
              disabled={fetchLoadingFromHook || fetchLoading}
            />
          </Box>
        ),
      };
    });

  useEffect(() => {
    if (selectedId && !deleteLoading && !fetchLoadingFromHook && !fetchLoading) {
      deleteCountry(selectedId).then(() => {
        if (success) {
          console.log(`Country with ID ${selectedId} deleted successfully`);
          setSelectedId(null);
          refetch();
        } else if (error) {
          console.error(`Error deleting country with ID ${selectedId}:`, error);
          setSelectedId(null);
        }
      });
    }
  }, [selectedId, deleteLoading, fetchLoadingFromHook, fetchLoading, deleteCountry, success, error, refetch]);

  const rows = formatRows(currencies);

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
        showAddButton={true}
        addButtonTitle="Add Country"
        addButtonStyle={{ marginTop: '40px' }}
        searchPlaceholder="search by country etc"
        onAddButtonClick={onAddButtonClick}
      />
      <CountryViewModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setViewId(null);
          setModalCountry(null);
        }}
        country={modalCountry}
      />
    </Box>
  );
};

CountryTable.propTypes = {
  countryCurrencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Currency_Id: PropTypes.string.isRequired,
      Country_name: PropTypes.string.isRequired,
      Country_code: PropTypes.string.isRequired,
      Country_dial_code: PropTypes.string,
      Country_Flag: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ),
  onAddButtonClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

CountryTable.defaultProps = {
  countryCurrencies: [],
};

export default CountryTable;