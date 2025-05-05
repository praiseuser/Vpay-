import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Drawer,
  Popover,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const TableHeader = ({
  title,
  titleStyle,
  searchTerm,
  handleSearchChange,
  searchPlaceholder = "Search...",
  showAddButton = false,
  showFilterButton = false,
  addButtonTitle = "Add",
  addButtonStyle = {},
  filterButtonStyle = {},
  onAddButtonClick = () => {},
  onFilterApply = () => {}, // Callback to pass filter values to parent
  countryOptions = ['USA', 'UK', 'Canada', 'Nigeria', 'Germany'], // Default country options
  networkOptions = ['Ethereum', 'Bitcoin', 'Polygon', 'Solana'], // Default network options
  statusOptions = ['Active', 'Inactive', 'Pending'], // Default status options
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for filter drawer/popover
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    email: '',
    minBalance: '',
    maxBalance: '',
    network: '',
    name: '',
    userId: '',
    status: '',
  });

  const handleFilterClick = (event) => {
    if (isMobile) {
      setFilterOpen(true);
    } else {
      setFilterAnchorEl(event.currentTarget);
    }
  };

  const handleFilterClose = () => {
    if (isMobile) {
      setFilterOpen(false);
    } else {
      setFilterAnchorEl(null);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterApply(filters);
    handleFilterClose();
  };

  const handleClearFilters = () => {
    setFilters({
      country: '',
      email: '',
      minBalance: '',
      maxBalance: '',
      network: '',
      name: '',
      userId: '',
      status: '',
    });
    onFilterApply({
      country: '',
      email: '',
      minBalance: '',
      maxBalance: '',
      network: '',
      name: '',
      userId: '',
      status: '',
    });
  };

  const filterContent = (
    <Box
      sx={{
        p: 3,
        width: isMobile ? '100%' : '400px',
        backgroundColor: 'white',
        borderRadius: '8px',
        animation: 'fadeIn 0.3s ease-in',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Mada',
          fontSize: '16px',
          color: '#02042D',
          mb: 2,
          fontWeight: 600,
        }}
      >
        Filter Options
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="country"
            label="Country"
            value={filters.country}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          >
            <option value="">All</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email"
            value={filters.email}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="minBalance"
            label="Min Balance"
            type="number"
            value={filters.minBalance}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="maxBalance"
            label="Max Balance"
            type="number"
            value={filters.maxBalance}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="network"
            label="Network"
            value={filters.network}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          >
            <option value="">All</option>
            {networkOptions.map((network) => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="userId"
            label="User ID"
            value={filters.userId}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            name="status"
            label="Status"
            value={filters.status}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#02042D',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#666',
              },
            }}
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            borderColor: '#02042D',
            color: '#02042D',
            fontFamily: 'Inter',
            fontSize: '14px',
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            '&:hover': {
              borderColor: '#02042D',
              backgroundColor: 'rgba(2, 4, 45, 0.05)',
            },
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          sx={{
            backgroundColor: '#02042D',
            color: 'white',
            fontFamily: 'Inter',
            fontSize: '14px',
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            '&:hover': {
              backgroundColor: '#02042D',
              opacity: 0.9,
            },
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );

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
              fontSize: '12px',
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

      {(showAddButton || showFilterButton) && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {showAddButton && (
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
          )}

          {showFilterButton && (
            <>
              <Button
                variant="outlined"
                onClick={handleFilterClick}
                sx={{
                  width: '108px',
                  height: '40px',
                  borderRadius: '10px',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  borderColor: '#AAAAAA',
                  color: '#171832',
                  ...filterButtonStyle,
                }}
              >
                <FilterAltIcon sx={{ width: 20, height: 20, mr: 1 }} />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#171832',
                  }}
                >
                  Filter
                </Typography>
              </Button>
              {isMobile ? (
                <Drawer
                  anchor="bottom"
                  open={filterOpen}
                  onClose={handleFilterClose}
                  PaperProps={{
                    sx: {
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      maxHeight: '80vh',
                      overflowY: 'auto',
                    },
                  }}
                >
                  {filterContent}
                </Drawer>
              ) : (
                <Popover
                  open={Boolean(filterAnchorEl)}
                  anchorEl={filterAnchorEl}
                  onClose={handleFilterClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                    },
                  }}
                >
                  {filterContent}
                </Popover>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TableHeader;