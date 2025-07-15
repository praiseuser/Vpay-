import { Grid, TextField, MenuItem } from '@mui/material';

const ProviderFormFields = ({ formData, handleChange, countries, loading }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
      <TextField
        name="provider_name"
        label="Provider Name"
        variant="outlined"
        fullWidth
        value={formData.provider_name}
        onChange={handleChange}
        required
        disabled={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#E0E0E0' },
            '&:hover fieldset': { borderColor: '#B0B0B0' },
            '&.Mui-focused fieldset': { borderColor: '#208BC9' }, // Matches DashboardSideNav.js
          },
        }}
        InputProps={{
          sx: {
            height: 40,
            width: '95%',
            maxWidth: 320,
            fontFamily: 'Inter',
            fontSize: 14,
            color: '#333',
            input: { padding: '8px 12px' }, // Adjusted padding for 40px height
          },
        }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        select
        name="country_id"
        label="Country"
        variant="outlined"
        fullWidth
        value={formData.country_id}
        onChange={handleChange}
        required
        disabled={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#E0E0E0' },
            '&:hover fieldset': { borderColor: '#B0B0B0' },
            '&.Mui-focused fieldset': { borderColor: '#208BC9' },
          },
        }}
        InputProps={{
          sx: {
            height: 40,
            width: '95%',
            maxWidth: 320,
            fontFamily: 'Inter',
            fontSize: 14,
            color: '#333',
            input: { padding: '8px 12px' }, // Adjusted padding for 40px height
          },
        }}
      >
        {countries?.length > 0 ? (
          countries.map((country) => (
            <MenuItem key={country.country_id} value={country.country_id.toString()}>
              {country.country_name} ({country.country_code})
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="">
            Loading countries...
          </MenuItem>
        )}
      </TextField>
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="unit_rate"
        label="Unit Rate"
        type="number"
        variant="outlined"
        fullWidth
        value={formData.unit_rate}
        onChange={handleChange}
        required
        disabled={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#E0E0E0' },
            '&:hover fieldset': { borderColor: '#B0B0B0' },
            '&.Mui-focused fieldset': { borderColor: '#208BC9' },
          },
        }}
        InputProps={{
          sx: {
            height: 40,
            width: '95%',
            maxWidth: 320,
            fontFamily: 'Inter',
            fontSize: 14,
            color: '#333',
            input: { padding: '8px 12px' }, // Adjusted padding for 40px height
          },
        }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="provider_category"
        label="Provider Category"
        variant="outlined"
        fullWidth
        value={formData.provider_category}
        onChange={handleChange}
        required
        disabled={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#E0E0E0' },
            '&:hover fieldset': { borderColor: '#B0B0B0' },
            '&.Mui-focused fieldset': { borderColor: '#208BC9' },
          },
        }}
        InputProps={{
          sx: {
            height: 40,
            width: '95%',
            maxWidth: 320,
            fontFamily: 'Inter',
            fontSize: 14,
            color: '#333',
            input: { padding: '8px 12px' }, // Adjusted padding for 40px height
          },
        }}
      />
    </Grid>
    <Grid item xs={12} sm={4}></Grid> {/* Placeholder for three-per-row */}
  </Grid>
);

export default ProviderFormFields;