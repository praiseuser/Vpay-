import React from 'react';
import { Box, Typography, Pagination } from '@mui/material';

const TablePaginationComponent = ({
  page,
  rowsPerPage,
  totalEntries,
  currentRowsCount,
  onPageChange,
}) => {
  const start = (page - 1) * rowsPerPage + 1;
  const end = start + currentRowsCount - 1;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Raleway',
          fontWeight: 400,
          fontSize: '12px',
          color: '#73757C',
        }}
      >
        Showing {start} to {end} of {totalEntries} entries
      </Typography>

      <Pagination
        count={Math.ceil(totalEntries / rowsPerPage)}
        page={page}
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

export default TablePaginationComponent;
