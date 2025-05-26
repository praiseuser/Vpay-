import React, { useState } from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Check, Delete, ExpandMore } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'NAME', minWidth: 150 },
  { id: 'userId', label: 'USER ID', minWidth: 150 },
  { id: 'role', label: 'ROLE', minWidth: 150 },
  { id: 'dateAdded', label: 'DATE ADDED', minWidth: 180 },
  { id: 'action', label: '', minWidth: 100 },
];

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const rawData = [
  {
    id: '1',
    name: 'Praise Nwachukwu',
    userId: 'ADMEDITS',
    role: 'Super Admin',
    dateAdded: '2024-05-09 | 09:23 am',
  },
];

const formatRows = (data) =>
  data.map((item) => ({
    name: <span style={{ ...rowStyle, fontWeight: 700, color: '#333' }}>{item.name}</span>,
    userId: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>{item.userId}</span>,
    role: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>{item.role}</span>,
    dateAdded: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>{item.dateAdded}</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Check sx={{ color: '#00B894', cursor: 'pointer' }} />
        <Delete sx={{ color: '#E74C3C', cursor: 'pointer' }} />
        <ExpandMore sx={{ color: '#636E72', cursor: 'pointer' }} />
      </div>
    ),
  }));

export default function AllAdminPage() {
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
  const [filteredData, setFilteredData] = useState(rawData);

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
    let filtered = [...rawData];

    if (filters.name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.userId) {
      filtered = filtered.filter((item) =>
        item.userId.toLowerCase().includes(filters.userId.toLowerCase())
      );
    }
    if (filters.status) { 
      filtered = filtered.filter((item) =>
        item.role.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (term) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.userId.toLowerCase().includes(term) ||
          item.role.toLowerCase().includes(term) ||
          item.dateAdded.toLowerCase().includes(term)
      );
    }

    setFilteredData(filtered);
  };

  const rows = formatRows(filteredData);

  return (
    <CustomTable
      columns={columns}
      rows={rows}
      showAddButton={true}
      addButtonTitle="Add admin"
      addButtonStyle={{}}
      showFilterButton={true}
      title="Users"
      titleStyle={{
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '100%',
        letterSpacing: '0px',
        color: '#208BC9',
        marginLeft: '24px',
        marginBottom: '7px',
      }}
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      searchPlaceholder="search"
      onFilterApply={handleFilterApply}
      countryOptions={[]} 
      networkOptions={[]} 
      statusOptions={['Super Admin', 'Admin', 'Editor']} 
    />
  );
}