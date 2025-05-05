import React, { useState } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AddFiatPage from '../../AddFiatPage';

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const columns = [
  { id: 'currency', label: 'CURRENCY', minWidth: 150 },
  { id: 'network', label: 'NETWORK', minWidth: 150 },
  { id: 'status', label: 'STATUS', minWidth: 120 },
  { id: 'date_activated', label: 'DATE ACTIVATED', minWidth: 180 },
  { id: 'action', label: '', minWidth: 180 },
];

const fiatRows = [
  {
    currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>US Dollar (USD)</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>BEP 20</span>,
    status: <CustomButton type="green" />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-01 | 11:00 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
        <CustomButton type="disable" />
      </div>
    ),
  },
  {
    currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Uganda (UGX)</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>BEP 20</span>,
    status: <CustomButton type="green" />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-01 | 11:00 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
        <CustomButton type="disable" />
      </div>
    ),
  },
  {
    currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Nigeria Naira (NGN)</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>BEP 20</span>,
    status: <CustomButton type="green" />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-01 | 11:00 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
        <CustomButton type="disable" />
      </div>
    ),
  },
];

export default function FiatCurrencyPage() {
  const [showAddFiatForm, setShowAddFiatForm] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleAddFiatClick = () => {
    setShowAddFiatForm(true);
  };

  const handleBackToList = () => {
    setShowAddFiatForm(false);
  };

  return (
    <Box
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100vh' : 'auto',
        overflow: 'hidden',
      }}
    >
      {showAddFiatForm ? (
        <AddFiatPage onCancel={handleBackToList} />
      ) : (
        <CustomTable
          columns={columns}
          rows={fiatRows}
          showAddButton={true}
          showFilterButton={true}
          showFilterStyle={{ marginTop: '40px' }}
          addButtonTitle="Add FIAT"
          addButtonStyle={{}}
          title="Manage Fiat"
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
          searchPlaceholder="Search by email address, name, country, etc"
          onAddButtonClick={handleAddFiatClick}
        />
      )}
    </Box>
  );
}
