import { useMediaQuery, CircularProgress, Box } from '@mui/material';
import { useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import CustomButton from '../../../components/CustomButton';
import { useFetchCountryCurrencies } from '../../../Hooks/useCountryCurrency';
import AddCountryForm from '../ManageCountries/AddCountryForm';

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

const ManageCountries = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { countryCurrencies, loading, error } = useFetchCountryCurrencies();
  const [showForm, setShowForm] = useState(false);

  const formatRows = (data) =>
    data.map((item, index) => ({
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
          <CustomButton type="delete" />
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: '#1976d2',
                position: 'relative',
                zIndex: 1,
              }}
            />
          )}
        </Box>
      ),
    }));

  return (
    <div
      className={`pt-${isMobile ? '2' : '3'} pb-${isMobile ? '2' : '4'} px-${isMobile ? '2' : '4'} w-full`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100vh' : 'auto',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          paddingTop: isMobile ? '2px' : '4px',
          paddingBottom: '16px',
          position: 'relative',
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '70%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <CircularProgress size={30} sx={{ color: '#1976d2' }} />
          </Box>
        )}

        {showForm ? (
         <AddCountryForm
         onCancel={() => setShowForm(false)}
         countries={countryCurrencies}
         currencyOptions={countryCurrencies}
       />
        ) : (
          <CustomTable
            columns={columns}
            rows={formatRows(countryCurrencies)}
            showAddButton={true}
            addButtonTitle="Add Country"
            addButtonStyle={{ marginTop: '40px' }}
            title="Manage Countries"
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
            searchPlaceholder="search by country etc"
            onAddButtonClick={() => setShowForm(true)}
          />
        )}


        {error && (
          <div style={{ textAlign: 'center', color: 'red', marginTop: '16px' }}>
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCountries;
