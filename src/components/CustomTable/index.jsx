import React, { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import TableContainerComponent from './TableContainerComponent';
import TableHeaderComponent from './TableHeaderComponent';
import PaginationComponent from './PaginationComponent';
import CustomTabs from '../CustomTabs/CustomTabs';

const CustomTable = ({
  columns = [],
  rows = [],
  showAddButton = false,
  showFilterButton = false,
  showSearch = true,
  showPagination = true,
  title,
  titleStyle,
  addButtonTitle = 'Add',
  addButtonStyle = {},
  searchTerm: propSearchTerm = '',
  handleSearchChange: propHandleSearchChange,
  searchPlaceholder = 'Search...',
  onAddButtonClick = () => {},
  onFilterApply,
  countryOptions = [],
  networkOptions = [],
  statusOptions = [],
  onRowClick = () => {},
  tabLabels = [],
  activeTab,
  onTabChange,
  collapsed,
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(propSearchTerm);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const rowsPerPage = 5;

  const currentRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalEntries = rows.length;

  const handleRowSelect = (rowId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === rows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(rows.map((_, i) => i)));
    }
  };

  return (
    <Paper
      sx={{
        m: '0 auto',
        border: '1px solid #DCE7EC',
        borderRadius: '12px',
        backgroundColor: 'white',
        p: { xs: 1, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: 'calc(100vh - 250px)', md: '80vh' },
        overflow: 'visible',
        position: 'relative',
      }}
    >
      {tabLabels.length > 0 && (
        <Box sx={{ flexShrink: 0, mb: 2 }}>
          <CustomTabs tabLabels={tabLabels} value={activeTab} onChange={onTabChange} />
        </Box>
      )}

      <TableHeaderComponent
        title={title}
        titleStyle={titleStyle}
        searchTerm={searchTerm}
        handleSearchChange={(e) => {
          setSearchTerm(e.target.value);
          propHandleSearchChange?.(e);
          setPage(1);
        }}
        searchPlaceholder={searchPlaceholder}
        showAddButton={showAddButton}
        showFilterButton={showFilterButton}
        addButtonTitle={addButtonTitle}
        addButtonStyle={addButtonStyle}
        onAddButtonClick={onAddButtonClick}
        onFilterApply={onFilterApply}
        countryOptions={countryOptions}
        networkOptions={networkOptions}
        statusOptions={statusOptions}
        showSearch={showSearch}  
      />

      <TableContainerComponent
        columns={columns}
        currentRows={currentRows}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleSelectAll={handleSelectAll}
        onRowClick={onRowClick}
      />

      {showPagination && (
        <PaginationComponent
          currentPage={page}
          totalEntries={totalEntries}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
        />
      )}
    </Paper>
  );
};

export default CustomTable;
