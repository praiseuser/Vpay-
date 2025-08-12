import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const TableHeader = ({
  title,
  titleStyle,
  searchTerm,
  handleSearchChange,
  searchPlaceholder = 'Search...',
  showAddButton = false,
  addButtonTitle = 'Add',
  addButtonStyle = {},
  onAddButtonClick = () => {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {title && (
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '10px',
              color: '#BDBDBD',
              ...titleStyle,
            }}
          >
            {title}
          </Typography>
        )}
        <TextField
          variant="outlined"
          size="small"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ width: 20, height: 20, color: '#BDBDBD' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: isMobile ? '100%' : '308px',
            height: '40px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#D9D9D9',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#28C3FF',
              },
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '12px',
              color: '#BDBDBD',
              paddingLeft: '8px',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}></Box>

      {showAddButton && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={onAddButtonClick}
            sx={{
              backgroundColor: '#208BC9',
              width: '119px',
              height: '40px',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#1AA3D6',
              },
              ...addButtonStyle,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '12px',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
              }}
            >
              {addButtonTitle}
            </Typography>
            <AddIcon sx={{ width: 14, height: 14, color: 'white', ml: 1 }} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TableHeader;