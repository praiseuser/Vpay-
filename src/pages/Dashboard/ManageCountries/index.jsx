import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import CountryTable from '../ManageCountries/CountryTable';
import AddCountryForm from '../ManageCountries/AddCountryForm';
import { useFetchCountryCurrencies } from '../../../Hooks/useCountryCurrency';
import LoadingOverlay from '../ManageCountries/LoadingOverlay';
import ErrorMessage from '../ManageCountries/ErrorMessage';
import { pageContainerStyle, contentContainerStyle } from '../ManageCountries/countryStyles';
import EditCountry from '../ManageCountries/EditCountry';

const ManageCountries = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { countryCurrencies, loading, error } = useFetchCountryCurrencies();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null); 

  const handleAddButtonClick = () => {
    setEditData(null); 
    setShowForm(true);
  };

  const handleEditButtonClick = (country) => {
    setEditData(country);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditData(null);
  };

  return (
    <div
      className={`pt-${isMobile ? '2' : '3'} pb-${isMobile ? '2' : '4'} px-${isMobile ? '2' : '4'} w-full`}
      style={isMobile ? { ...pageContainerStyle, height: '100vh' } : pageContainerStyle}
    >
      <div style={contentContainerStyle}>
        <LoadingOverlay loading={loading} />

        {showForm ? (
          editData ? (
            <EditCountry
              countryData={editData}
              onUpdateSuccess={handleFormCancel}
              onCancel={handleFormCancel}
            />
          ) : (
            <AddCountryForm
              onCancel={handleFormCancel}
              countries={countryCurrencies}
              currencyOptions={countryCurrencies}
            />
          )
        ) : (
          <CountryTable
            countryCurrencies={countryCurrencies}
            onAddButtonClick={handleAddButtonClick}
            onEditButtonClick={handleEditButtonClick}
            loading={loading}
          />
        )}


        <ErrorMessage error={error} />
      </div>
    </div>
  );
};

export default ManageCountries;
