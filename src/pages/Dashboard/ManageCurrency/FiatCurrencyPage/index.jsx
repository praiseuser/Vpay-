import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import FiatTable from '../FiatCurrencyPage/FiatTable';
import AddFiatPage from '../../AddFiatPage';
import EditFiatStatusModal from './EditFiatStatusModal';
import { useFetchFiatCurrencies } from '../../../../Hooks/useFiatCurrency';
import { pageContainerStyle } from '../FiatCurrencyPage/fiatStyles';

const FiatCurrencyPage = ({ activeTab, setActiveTab, isMobile }) => {
  const [showAddFiatForm, setShowAddFiatForm] = useState(false);
  const [editFiatData, setEditFiatData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState(null);
  const [fiatData, setFiatData] = useState([]);

  const { fiatCurrencies, loading, error } = useFetchFiatCurrencies();

  useEffect(() => {
    console.log("Fetched fiatCurrencies:", fiatCurrencies);
    setFiatData(fiatCurrencies);
  }, [fiatCurrencies]);

  const handleAddFiatClick = () => {
    setEditFiatData(null);
    setShowAddFiatForm(true);
  };

  const handleEditClick = (fiatItem) => {
    console.log("Selected fiat for editing:", fiatItem);
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

  return (
    <Box
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={isMobile ? { ...pageContainerStyle, height: '100vh' } : pageContainerStyle}
    >
      {showAddFiatForm ? (
        <AddFiatPage
          onCancel={handleBackToList}
          fiatData={editFiatData}
          isEditMode={!!editFiatData}
        />
      ) : (
        <>
          {error ? (
            <div className="p-6 text-red-600">Error: {error}</div>
          ) : (
            <FiatTable
              fiatData={fiatData}
              handleEditClick={handleEditClick}
              onAddButtonClick={handleAddFiatClick}
              loading={loading}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
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
};

export default FiatCurrencyPage;