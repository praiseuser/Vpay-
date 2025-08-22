import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import CryptoTable from '../CryptoCurrencyPage/cryptoTable';
import AddCryptoPage from '../../AddCryptoPage';
import EditCryptoModal from '../EditCryptoModal';
import { useFetchCurrencies } from '../../../../Hooks/useCryptoCurrency';
import { pageContainerStyle, contentContainerStyle } from './cryptoStyles';

const CryptoCurrencyPage = ({ activeTab, setActiveTab, isMobile }) => {
  const [showAddCryptoForm, setShowAddCryptoForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoData, setCryptoData] = useState([]);

  const { cryptoCurrencies, loading, error } = useFetchCurrencies();

  useEffect(() => {
    setCryptoData(cryptoCurrencies || []);
  }, [cryptoCurrencies]);

  const handleAddCryptoClick = () => {
    setShowAddCryptoForm(true);
  };

  const handleBackToList = () => {
    setShowAddCryptoForm(false);
  };

  const handleAddCrypto = (newCrypto) => {
    setCryptoData((prev) => [...prev, newCrypto]);
  };

  const handleEditClick = (crypto) => {
    setSelectedCrypto(crypto);
    setShowEditModal(true);
  };

  const handleEditSave = (updatedCrypto) => {
    setCryptoData((prev) =>
      prev.map((item) =>
        item.crypto_name === selectedCrypto.crypto_name &&
        item.network === selectedCrypto.network
          ? { ...item, ...updatedCrypto }
          : item
      )
    );
    setShowEditModal(false);
    setSelectedCrypto(null);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setSelectedCrypto(null);
  };

  return (
    <Box
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={isMobile ? { ...pageContainerStyle, height: '100vh' } : pageContainerStyle}
    >
      <Box style={contentContainerStyle}>
        {showAddCryptoForm ? (
          <AddCryptoPage onCancel={handleBackToList} onSubmit={handleAddCrypto} />
        ) : (
          <>
            <CryptoTable
              cryptoData={cryptoData}
              onAddButtonClick={handleAddCryptoClick}
              onEditClick={handleEditClick}
              loading={loading}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <EditCryptoModal
              open={showEditModal}
              onClose={handleEditClose}
              crypto={selectedCrypto}
              onSave={handleEditSave}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CryptoCurrencyPage;