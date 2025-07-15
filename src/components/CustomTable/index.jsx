import React, { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import TableContainerComponent from '../CustomTable/TableContainerComponent';
import TableHeaderComponent from '../CustomTable/TableHeaderComponent';
import PaginationComponent from '../CustomTable/PaginationComponent';
import CustomTabs from '../CustomTabs/CustomTabs';

const CustomTable = ({
  columns = [],
  rows = [],
  showAddButton = false,
  showFilterButton = false,
  title,
  titleStyle,
  addButtonTitle = 'Add',
  addButtonStyle = {},
  showFilterStyle = {},
  searchTerm: propSearchTerm = '',
  handleSearchChange: propHandleSearchChange,
  searchPlaceholder = 'Search...',
  onAddButtonClick = () => { },
  onFilterApply,
  countryOptions = [],
  networkOptions = [],
  statusOptions = [],
  onRowClick = () => { },
  tabLabels = [],
  activeTab,
  onTabChange,
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(propSearchTerm);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const rowsPerPage = 5;

  useEffect(() => {
    setSearchTerm(propSearchTerm);
  }, [propSearchTerm]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (propHandleSearchChange) {
      propHandleSearchChange(event);
    }
    setPage(1);
  };

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

  const currentRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalEntries = rows.length;

  return (
    <Paper
      sx={{
        width: '100%',
        maxWidth: 1070,
        m: '0 auto',
        border: '1.5px solid #DCE7EC',
        borderRadius: '16px',
        backgroundColor: 'white',
        p: { xs: 2, md: 3 },
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
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', pb: 2 }}>
        <TableHeaderComponent
          title={title}
          titleStyle={titleStyle}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
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
        />
      </Box>
      <TableContainerComponent
        columns={columns}
        currentRows={currentRows}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleSelectAll={handleSelectAll}
        onRowClick={onRowClick}
      />
      <PaginationComponent
        currentPage={page}
        totalEntries={totalEntries}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};

export default CustomTable;