import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import TableHeader from '../CustomTable/TableHeader';
import PaginationComponent from '../CustomTable/PaginationComponent';

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
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(propSearchTerm);

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

  const currentRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalEntries = rows.length;

  return (
    <Paper
      sx={{
        width: '100%',
        maxWidth: 1070,
        m: '0 auto',
        border: '2px solid #DCE7EC',
        borderRadius: '16px',
        backgroundColor: 'white',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: 'calc(100vh - 200px)', md: '80vh' }, // Adjusted for better fit
        overflow: 'hidden',
      }}
    >
      <TableHeader
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

      <TableContainer
        sx={{
          width: '100%',
          maxHeight: { xs: 'calc(100vh - 300px)', md: 400 },
          borderRadius: '24px',
          overflowX: 'auto',
          overflowY: 'auto',
          border: 2,
          borderColor: '#DCE7EC',
          flexGrow: 1,
          scrollbarWidth: 'thin', 
          scrollbarColor: '#ccc transparent', 
          '&::-webkit-scrollbar': {
            width: '1px',
            height: '1px', 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#aaa', 
            },
          },
        }}
      >


        <Table stickyHeader aria-label="custom table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    minWidth: col.minWidth || 100,
                    backgroundColor: '#28C3FF29',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 600,
                    fontSize: 10,
                    color: '#73757C',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ height: '20px' }}></TableRow>
            {currentRows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ height: '60px', cursor: 'pointer' }}
                onClick={() => onRowClick(row)}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} sx={{ borderBottom: 'none' }}>
                    {row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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