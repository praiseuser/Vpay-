import { Box, Typography, Chip } from '@mui/material';
import CustomTable from '../../../../components/CustomTable';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BouncingLoader from '../../../../components/BouncingLoader';

const userStyles = {
  styledTableCell: {
    fontFamily: 'Mada',
    '&.table-text': {
      color: '#888B93',
      '&.font-weight-600': { fontWeight: 600 },
      '&.font-weight-400': { fontWeight: 400 },
    },
  },
};

const StyledTableCell = styled('span')(({ theme }) => userStyles.styledTableCell);

const StyledEmailPhoneCell = styled('span')({
  fontFamily: 'Mada',
  '&.table-text': {
    color: '#888B93',
    '&.font-weight-600': { fontWeight: 600 },
    '&.font-weight-400': { fontWeight: 400 },
  },
});

const columns = [
  { id: 'id', label: 'S/N', minWidth: 70 },
  { id: 'firstname', label: 'FIRST NAME', minWidth: 150 },
  { id: 'lastname', label: 'LAST NAME', minWidth: 150 },
  { id: 'email', label: 'EMAIL', minWidth: 200 },
  { id: 'status', label: 'STATUS', minWidth: 120 },
  { id: 'phone', label: 'PHONE', minWidth: 150 },
  { id: 'gender', label: 'GENDER', minWidth: 120 },
  { id: 'action', label: '', minWidth: 80 },
];

const UserTable = ({ users, loading, error, columns, onOpenDrawer }) => {
  console.log('Loading:', loading, 'Users:', users, 'Error:', error); // Enhanced debug
  const formatRows = (data) => {
    if (!data || data.length === 0) {
      return []; // Empty rows, loader will handle visual
    }
    return data.map((item, index) => ({
      id: <StyledTableCell className="table-text font-weight-600">{index + 1}</StyledTableCell>,
      firstname: <StyledTableCell className="table-text font-weight-400">{item.firstname || 'N/A'}</StyledTableCell>,
      lastname: <StyledTableCell className="table-text font-weight-400">{item.lastname || 'N/A'}</StyledTableCell>,
      email: <StyledEmailPhoneCell className="table-text font-weight-500">{item.email || 'N/A'}</StyledEmailPhoneCell>,
      status: (
        <StyledTableCell>
          <Chip
            label={item.status === 1 ? 'Active' : 'Inactive'}
            color={item.status === 1 ? 'success' : 'default'}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </StyledTableCell>
      ),
      phone: <StyledEmailPhoneCell className="table-text font-weight-500">{item.phone || 'N/A'}</StyledEmailPhoneCell>,
      gender: <StyledTableCell className="table-text font-weight-400">{item.gender || 'N/A'}</StyledTableCell>,
      action: (
        <StyledTableCell>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => onOpenDrawer(item.id)}
          >
            <ArrowForwardIosIcon style={{ width: '15px', height: '15px', color: '#73757C' }} />
          </div>
        </StyledTableCell>
      ),
    }));
  };

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ position: 'relative', minHeight: '200px', '&::after': { content: '""', clear: 'both' } }}>
      <div style={{ position: 'relative', minHeight: 'inherit' }}>
        <CustomTable
          columns={columns}
          rows={formatRows(users || [])}
          showAddButton={false}
          sx={{
            '& .MuiTableCell-root': { padding: '12px' },
            opacity: loading ? 0.5 : 1,
            position: 'relative',
            zIndex: 0,
          }}
        />
        {(!users || users.length === 0 || loading) && <BouncingLoader />}
      </div>
    </Box>
  );
};

export default UserTable;