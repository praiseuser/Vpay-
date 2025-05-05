import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AddCryptoPage from '../../AddCryptoPage';

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

// Raw data for filtering
const initialCryptoData = [
  {
    currency: 'Bitcoin',
    network: 'BEP20',
    status: 'Active',
    date_activated: '2024-05-09 | 09:23 am',
  },
  {
    currency: 'Binance',
    network: 'BEP20',
    status: 'Active',
    date_activated: '2024-05-09 | 09:23 am',
  },
  {
    currency: 'USDT',
    network: 'BEP20',
    status: 'Active',
    date_activated: '2024-05-09 | 09:23 am',
  },
];

// Convert raw data to JSX rows for display
const formatRows = (data) =>
  data.map((item) => ({
    currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>{item.currency}</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>{item.network}</span>,
    status: <CustomButton type={item.status === 'Active' ? 'green' : 'red'} />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>{item.date_activated}</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
        <CustomButton type="disable" />
      </div>
    ),
  }));

export default function CryptoCurrencyPage() {
  const [showAddCryptoForm, setShowAddCryptoForm] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [cryptoData, setCryptoData] = useState(initialCryptoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    email: '',
    minBalance: '',
    maxBalance: '',
    network: '',
    name: '',
    userId: '',
    status: '',
  });
  const [filteredData, setFilteredData] = useState(cryptoData);

  const handleAddCryptoClick = () => {
    setShowAddCryptoForm(true);
  };

  const handleBackToList = () => {
    setShowAddCryptoForm(false);
  };

  const handleAddCrypto = (newCrypto) => {
    setCryptoData((prev) => [...prev, newCrypto]);
    setFilteredData((prev) => [...prev, newCrypto]);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFiltersAndSearch(filters, term);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    applyFiltersAndSearch(newFilters, searchTerm);
  };

  const applyFiltersAndSearch = (filters, term) => {
    let filtered = [...cryptoData];

    // Apply filters
    if (filters.name) {
      filtered = filtered.filter((item) =>
        item.currency.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.network) {
      filtered = filtered.filter((item) =>
        item.network.toLowerCase() === filters.network.toLowerCase()
      );
    }
    if (filters.status) {
      filtered = filtered.filter((item) =>
        item.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply search
    if (term) {
      filtered = filtered.filter(
        (item) =>
          item.currency.toLowerCase().includes(term) ||
          item.network.toLowerCase().includes(term) ||
          item.status.toLowerCase().includes(term) ||
          item.date_activated.toLowerCase().includes(term)
      );
    }

    setFilteredData(filtered);
  };

  // Format the filtered data into rows for the table
  const rows = formatRows(filteredData);

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
          <CustomTable
            columns={columns}
            rows={rows}
            showAddButton
            showFilterButton
            showSearchBar
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
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            searchPlaceholder="Search by currency, network, etc."
            onAddButtonClick={handleAddCryptoClick}
            onFilterApply={handleFilterApply}
            countryOptions={[]}
            networkOptions={['BEP20', 'ERC20', 'TRC20', 'Polygon', 'Solana']}
            statusOptions={['Active', 'Disabled']}
          />
        )}
      </div>
    </div>
  );
}