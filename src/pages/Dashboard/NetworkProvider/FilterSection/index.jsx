import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterSection = ({ filter, setFilter, providers }) => {
    const countryOptions = ['All', '1', 'GH'];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <FormControl sx={{ minWidth: 180 }}>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Filter by country code' }}
                    sx={{ borderRadius: '8px', backgroundColor: '#fff', '& .MuiSelect-select': { padding: '8px' } }}
                >
                    {countryOptions.map((country) => (
                        <MenuItem key={country} value={country}>
                            {country === '1' ? 'Nigeria' : country === 'GH' ? 'Ghana' : country}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default FilterSection;