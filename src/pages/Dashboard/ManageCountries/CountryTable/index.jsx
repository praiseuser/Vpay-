import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import { Box } from '@mui/material';
import { rowStyle, tableTitleStyle } from '../countryStyles';
import {
  useDeleteCountry,
  useFetchCountryCurrencies,
  useViewCountryById,
} from '../../../../Hooks/useCountryCurrency';
import CountryViewModal from '../CountryTable/CountryViewModal';
import PasswordModal from '../../Card/PasswordModal';
import { BASE_IMAGE_URL } from '../../../../utilities/constants';

const CountryTable = ({
  countryCurrencies: initialCurrencies,
  onAddButtonClick,
  loading: fetchLoading,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCountry, setModalCountry] = useState(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const { deleteCountry, loading: deleteLoading, error, success } = useDeleteCountry();
  const { countryCurrencies, loading: fetchLoadingFromHook, refetch } = useFetchCountryCurrencies();
  const { viewCountry, country: viewedCountry, loading: viewLoading, error: viewError } =
    useViewCountryById();

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
      setModalCountry(viewedCountry);
    } else if (viewError) {
      setModalCountry(null);
    }
  }, [viewedCountry, viewError, viewLoading, viewId]);

  useEffect(() => {
    if (modalCountry) {
      setModalOpen(true);
    }
  }, [modalCountry]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setPasswordModalOpen(true);
  };

  const handlePasswordConfirm = async (password) => {
    if (!selectedId) return;

    await deleteCountry(selectedId, password);

    if (success) {
      refetch();
    }
    setSelectedId(null);
    setPasswordModalOpen(false);
  };

  const columns = [
    { id: 'serial', label: 'S/N', minWidth: 80 },
    { id: 'country', label: 'COUNTRY NAME', minWidth: 150 },
    { id: 'code', label: 'COUNTRY CODE', minWidth: 150 },
    { id: 'dial_code', label: 'DIAL CODE', minWidth: 120 },
     { id: 'currency_code', label: 'CURRENCY CODE', minWidth: 150 },
    { id: 'flag', label: 'COUNTRY FLAG', minWidth: 120 },
    { id: 'status', label: 'STATUS', minWidth: 120 },
    { id: 'action', label: '', minWidth: 180 },
  ];

  const formatRows = (data) =>
    console.log(data) ||
    data.map((item, index) => {
      const isDeleteLoading = deleteLoading && selectedId === item.id;
      const isViewLoading = viewLoading && viewId === item.id;

      const flagSrc = item.Country_Flag
        ? `${BASE_IMAGE_URL}${item.Country_Flag}`
        : '';

      return {
        serial: <span className="table-text font-weight-500">{index + 1}</span>,
        currency_code: <span className="table-text font-weight-700">{item.Currency_code}</span>,
        country: <span className="table-text font-weight-400">{item.Country_name}</span>,
        code: <span className="table-text font-weight-400">{item.Country_code}</span>,
        dial_code: (
          <span className="table-text font-weight-500">
            {item.Country_dial_code || 'N/A'}
          </span>
        ),
        flag: (
          <Box style={rowStyle}>
            {item.Country_Flag ? (
              <img
                src={flagSrc}
                alt={item.Country_name}
                style={{ width: '30px', height: '30px', borderRadius: '6px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '';
                }}
              />
            ) : (
              <span className="table-text">N/A</span>
            )}
          </Box>
        ),
        status: <CustomButton type={item.status === 'active' ? 'red' : 'green'} />,
        action: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CustomButton type="edit" />
            <CustomButton
              type="delete"
              onClick={() => handleDeleteClick(item.id)}
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

  const rows = formatRows(currencies);

  return (
    <Box>
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
      <PasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        loading={deleteLoading}
        password={''}
      />
    </Box>
  );
};

CountryTable.propTypes = {
  countryCurrencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Currency_code: PropTypes.string.isRequired,
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
