import { useState } from 'react';
import { Box } from '@mui/material';
import FilterSection from '../NetworkProvider/FilterSection';
import ProviderTable from '../NetworkProvider/ProviderTable';
import ErrorDisplay from '../NetworkProvider/ErrorDisplay';
import { useFetchProvider } from '../../../Hooks/useProvider';

const NetworkProvider = () => {
    const { providers, loading, error, activeStatuses, toggleProviderStatus } = useFetchProvider();
    const [filter, setFilter] = useState('All');

    const filteredRates = providers.filter((item) => {
        console.log('Filter:', filter, 'Country ID:', item.country_id);
        return filter === 'All' || item.country_id === filter;
    });

    return (
        <Box sx={{ p: 1, backgroundColor: 'whitesmoke' }}>
            <FilterSection filter={filter} setFilter={setFilter} providers={providers} />
            <ProviderTable
                loading={loading}
                filteredRates={filteredRates}
                activeStatuses={activeStatuses}
                toggleProviderStatus={toggleProviderStatus}
            />
            <ErrorDisplay error={error} />
        </Box>
    );
};

export default NetworkProvider;