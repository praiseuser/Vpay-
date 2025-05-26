import React from 'react';
import { Pagination, Box, Typography } from '@mui/material';

const PaginationComponent = ({
  currentPage,
  totalEntries,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = start + Math.min(rowsPerPage, totalEntries - (currentPage - 1) * rowsPerPage) - 1;

  return (
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
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        sx={{
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#28C3FF',
            color: 'white',
          },
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
