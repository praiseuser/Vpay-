import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import AddFiatPage from '../../AddFiatPage';
import EditFiatStatusModal from './EditFiatStatusModal';
import { useFetchFiatCurrencies } from '../../../../Hooks/useFiatCurrency';

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const columns = [
  { id: 'Fiat_Currency', label: 'FIAT CURRENCY', minWidth: 150 },
  { id: 'status', label: 'STATUS', minWidth: 120 },
  { id: 'action', label: '', minWidth: 180 },
];

const formatRows = (data, handleEditClick) =>
  data.map((item) => {
    const buttonType = item.status === 1 ? 'green' : 'red';
    return {
      Fiat_Currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>{item.Fiat_Currency}</span>,
      status: <CustomButton type={buttonType} />,
      action: (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <CustomButton type="edit" onClick={() => handleEditClick(item)} />
        </div>
      ),
    };
  });

export default function FiatCurrencyPage() {
  const [showAddFiatForm, setShowAddFiatForm] = useState(false);
  const [editFiatData, setEditFiatData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [fiatData, setFiatData] = useState([]);

  const { fiatCurrencies, loading, error } = useFetchFiatCurrencies();

  useEffect(() => {
    console.log("Fetched fiatCurrencies:", fiatCurrencies); // Debug log to check data structure
    setFiatData(fiatCurrencies);
  }, [fiatCurrencies]);

  const handleAddFiatClick = () => {
    setEditFiatData(null);
    setShowAddFiatForm(true);
  };

  const handleEditClick = (fiatItem) => {
    console.log("Selected fiat for editing:", fiatItem); // Debug log
    setSelectedFiat(fiatItem);
    setShowEditModal(true);
  };

  const handleBackToList = () => {
    setShowAddFiatForm(false);
    setEditFiatData(null);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedFiat(null);
  };

  const handleSaveStatus = (updatedFiat) => {
    setFiatData((prevData) =>
      prevData.map((item) =>
        item.Fiat_Currency === updatedFiat.Fiat_Currency ? updatedFiat : item
      )
    );
    console.log("Updated fiat currency:", updatedFiat);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <AddFiatPage
          onCancel={handleBackToList}
          fiatData={editFiatData}
          isEditMode={!!editFiatData}
        />
      ) : (
        <>
          <CustomTable
            columns={columns}
            rows={formatRows(fiatData, handleEditClick)}
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
          <EditFiatStatusModal
            open={showEditModal}
            onClose={handleEditModalClose}
            fiatData={selectedFiat}
            onSave={handleSaveStatus}
          />
        </>
      )}
    </Box>
  );
}