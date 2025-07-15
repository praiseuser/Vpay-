import CustomTable from '../../../components/CustomTable';
import { useState, useEffect } from 'react';
import {
    Box,
    LinearProgress,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled('span')(() => ({
    fontFamily: 'Mada',
    '&.table-text': {
        color: '#888B93',
        '&.font-weight-600': { fontWeight: 600 },
        '&.font-weight-400': { fontWeight: 400 },
    },
}));

const BettingProvider = () => {
    const [filter, setFilter] = useState('');
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const dummyData = [
            {
                providerName: 'Bet9ja',
                betVolume: 1746,
                revenue: '₦4,125,600',
                revenueChange: 6.1,
                winRate: 60,
                activeBettors: 245,
            },
            {
                providerName: 'SportyBet',
                betVolume: 2150,
                revenue: '₦5,320,450',
                revenueChange: -2.5,
                winRate: 45,
                activeBettors: 310,
            },
            {
                providerName: 'Nairabet',
                betVolume: 1420,
                revenue: '₦3,910,000',
                revenueChange: 3.8,
                winRate: 70,
                activeBettors: 198,
            },
        ];
        setProviders(dummyData);
    }, []);

    const formatRows = (data) =>
        data.map((item) => ({
            providerName: (
                <StyledTableCell className="table-text font-weight-600">{item.providerName}</StyledTableCell>
            ),
            betVolume: (
                <StyledTableCell className="table-text font-weight-400">{item.betVolume.toLocaleString()}</StyledTableCell>
            ),
            revenue: (
                <StyledTableCell className="table-text font-weight-400">
                    {item.revenue}{' '}
                    <span style={{ color: item.revenueChange >= 0 ? '#28a745' : '#dc3545' }}>
                        ({item.revenueChange > 0 ? '+' : ''}
                        {item.revenueChange}%)
                    </span>
                </StyledTableCell>
            ),
            winRate: (
                <Box>
                    <StyledTableCell className="table-text font-weight-400">{item.winRate}%</StyledTableCell>
                    <LinearProgress
                        variant="determinate"
                        value={item.winRate}
                        sx={{
                            height: 6,
                            borderRadius: 4,
                            backgroundColor: '#ffe6e6',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: item.winRate > 50 ? '#dc3545' : '#ffc107',
                            },
                            mt: 0.5,
                        }}
                    />
                </Box>
            ),
            activeBettors: (
                <StyledTableCell className="table-text font-weight-400">
                    {item.activeBettors.toLocaleString()}
                </StyledTableCell>
            ),
        }));

    const columns = [
        { id: 'providerName', label: 'PROVIDER NAME', minWidth: 170 },
        { id: 'betVolume', label: 'BET VOLUME', minWidth: 150 },
        { id: 'revenue', label: 'REVENUE (NGN)', minWidth: 200 },
        { id: 'winRate', label: 'WIN RATE', minWidth: 160 },
        { id: 'activeBettors', label: 'ACTIVE BETTORS', minWidth: 160 },
    ];

    const filteredProviders = providers.filter((item) =>
        !filter || item.providerName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Box sx={{ padding: 1, backgroundColor: 'whitesmoke' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Filter betting providers' }}
                        sx={{
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            '& .MuiSelect-select': { padding: '8px' },
                        }}
                    >
                        <MenuItem value="">
                            <em>All Providers</em>
                        </MenuItem>
                        <MenuItem value="Bet9ja">Bet9ja</MenuItem>
                        <MenuItem value="SportyBet">SportyBet</MenuItem>
                        <MenuItem value="Nairabet">Nairabet</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <CustomTable
                columns={columns}
                rows={formatRows(filteredProviders)}
                searchPlaceholder="Search betting providers"
                sx={{ '& .MuiTableCell-root': { padding: '12px' } }}
            />
        </Box>
    );
};

export default BettingProvider;
