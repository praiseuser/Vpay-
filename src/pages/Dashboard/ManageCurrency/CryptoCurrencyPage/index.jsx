import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import AddCryptoPage from '../../AddCryptoPage';
import EditCryptoModal from '../../ManageCurrency/EditCryptoModal';
import { useFetchCurrencies } from '../../../../Hooks/useCryptoCurrency';

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const columns = [
  { id: 'crypto_name', label: 'CRYPTO NAME', minWidth: 150 },
  { id: 'network', label: 'NETWORK', minWidth: 150 },
  { id: 'status', label: 'STATUS', minWidth: 120 },
  { id: 'action', label: '', minWidth: 180 },
];

const initialCryptoData = [];

const formatRows = (data, onEditClick) =>
  data.map((item) => ({
    crypto_name: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>{item.crypto_name}</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>{item.network}</span>,
    status: <CustomButton type={item.status === '1' ? 'green' : 'red'} />,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" onClick={() => onEditClick(item)} />
        <CustomButton type="disable" />
      </div>
    ),
  }));

export default function CryptoCurrencyPage() {
  const [showAddCryptoForm, setShowAddCryptoForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [cryptoData, setCryptoData] = useState(initialCryptoData);

  const { cryptoCurrencies, loading, error } = useFetchCurrencies();

  useEffect(() => {
    if (cryptoCurrencies.length > 0) {
      setCryptoData(cryptoCurrencies);
    }
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
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setSelectedCrypto(null);
  };

  const rows = formatRows(cryptoData, handleEditClick);

  if (loading) return <div>Loading Crypto Currencies....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={`p-${isMobile ? '2' : '6'} w-full`}
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
          marginTop: '32px',
        }}
      >
        {showAddCryptoForm ? (
          <AddCryptoPage onCancel={handleBackToList} onSubmit={handleAddCrypto} />
        ) : (
          <>
            <CustomTable
              columns={columns}
              rows={rows}
              showAddButton
              addButtonTitle="Add Crypto"
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
              onAddButtonClick={handleAddCryptoClick}
            />
            <EditCryptoModal
              open={showEditModal}
              onClose={handleEditClose}
              crypto={selectedCrypto}
              onSave={handleEditSave}
            />
          </>
        )}
      </div>
    </div>
  );
}