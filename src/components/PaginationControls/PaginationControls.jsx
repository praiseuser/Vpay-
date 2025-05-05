import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';

const PaginationControls = ({ page, rowsPerPage, totalEntries, handlePageChange }) => {
  const start = (page - 1) * rowsPerPage + 1;
  const end = start + Math.min(rowsPerPage, totalEntries - (page - 1) * rowsPerPage) - 1;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: 10, width: '100%' }}>

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
  );
};

export default PaginationControls;
