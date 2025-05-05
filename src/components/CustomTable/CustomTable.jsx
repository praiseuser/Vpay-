import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import TableHeader from '../TableHeader/TableHeader';

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
  onAddButtonClick = () => {},
  onFilterApply,
  countryOptions = [],
  networkOptions = [],
  statusOptions = [],
  onRowClick = () => {},
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(propSearchTerm);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const rowsPerPage = 5;

  // Sync searchTerm with parent
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

  const start = (page - 1) * rowsPerPage + 1;
  const end = start + currentRows.length - 1;
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
        maxHeight: { xs: 'calc(100vh - 200px)', md: 'auto' },
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
        showFilterButton={!isSmallScreen && showFilterButton}
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
          maxHeight: { xs: 'calc(100vh - 300px)', md: 467 },
          borderRadius: '24px',
          overflowX: { xs: 'scroll', md: 'hidden' },
          overflowY: { xs: 'scroll', md: 'hidden' },
          border: 2,
          borderColor: '#DCE7EC',
          flexGrow: 1,
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Raleway',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '100%',
            letterSpacing: '0px',
            color: '#73757C',
          }}
        >
          Showing {start} to {end} of {totalEntries} entries
        </Typography>
        <Pagination
          count={Math.ceil(totalEntries / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#28C3FF',
              color: 'white',
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default CustomTable;