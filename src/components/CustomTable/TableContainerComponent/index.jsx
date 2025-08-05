import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.table-text': {
    fontFamily: 'Raleway, sans-serif',
    fontSize: 13,
    color: '#333',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fafafa',
  },
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
  },
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 600,
  fontSize: 10,
  color: '#555',
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const TableContainerComponent = ({
  columns,
  currentRows,
  onRowClick,
}) => {
  return (
    <TableContainer
      sx={{
        width: '100%',
        maxHeight: { xs: 'calc(100vh - 370px)', md: 'calc(80vh - 150px)' },
        borderRadius: '10px',
        overflowX: 'auto',
        overflowY: 'auto',
        border: '1px solid #DCE7EC',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        '&::-webkit-scrollbar': { height: '6px', width: '6px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
      }}
    >
      <Table stickyHeader aria-label="custom table" sx={{ borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledHeaderCell key={col.id} sx={{ minWidth: col.minWidth || 100 }}>
                {col.label}
              </StyledHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.length > 0 ? (
            currentRows.map((row, i) => (
              <StyledTableRow key={i} onClick={() => onRowClick(row)}>
                {columns.map((col) => (
                  <StyledTableCell key={col.id} className="table-text">
                    {row[col.id]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography
                  variant="body2"
                  sx={{ py: 2, fontFamily: 'Raleway, sans-serif', color: '#888', fontSize: 13 }} 
                >
                  No data found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContainerComponent;