import { useState, useEffect } from 'react';
import { Box, CircularProgress, Switch, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomTable from '../../../../components/CustomTable';
import CustomButton from '../../../../components/CustomButton';
import AddProviderForm from '../../NetworkProvider/AddProviderForm';
import EditProviderModal from '../../NetworkProvider/EditProviderModal';
import { useCreateProvider } from '../../../../Hooks/useProvider';
import { toast } from 'react-toastify';

const StyledTableCell = styled('span')(({ theme }) => ({
    fontFamily: 'Mada',
    '&.table-text': {
        color: '#888B93',
        '&.font-weight-600': { fontWeight: 600 },
        '&.font-weight-400': { fontWeight: 400 },
        '&.font-weight-300': { fontWeight: 300 },
    },
}));

const ProviderTable = ({ loading: tableLoading, filteredRates, onAddButtonClick }) => {
    const [showForm, setShowForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const { countries } = useCreateProvider();

    useEffect(() => {
        console.log("Filtered Rates:", filteredRates);
    }, [filteredRates]);

    const handleAddButtonClick = () => {
        setShowForm(true);
        if (typeof onAddButtonClick === 'function') onAddButtonClick();
    };

    const handleFormCancel = () => {
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
        console.log('New Provider Added:', formData);
        setShowForm(false);
        // Could also trigger a refresh here if needed
    };

    const handleEditClick = (provider) => {
        if (!provider || !provider.provider_id) {
            console.error("Invalid provider selected, missing provider_id:", provider);
            toast.error('Invalid provider selected, missing provider_id. Check data structure.');
            return;
        }
        setSelectedProvider(provider);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setSelectedProvider(null);
    };

    const handleUpdate = (updatedProvider) => {
        if (updatedProvider && updatedProvider.provider_id) {
            toast.success('Provider updated successfully!');
        }
    };

    const formatRows = (data) =>
        data.map((item) => ({
            provider_name: (
                <StyledTableCell className="table-text font-weight-600">
                    {item.provider_name}
                </StyledTableCell>
            ),
            country_id: (
                <StyledTableCell className="table-text font-weight-400">
                    {item.country_id}
                </StyledTableCell>
            ),
            unit_rate: (
                <StyledTableCell className="table-text font-weight-400">
                    {item.unit_rate}
                </StyledTableCell>
            ),
            provider_category: (
                <StyledTableCell className="table-text font-weight-400">
                    {item.provider_category}
                </StyledTableCell>
            ),
            status: (
                <Chip
                    label={item.status === true ? 'Active' : 'Inactive'}
                    color={item.status === true ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                />
            ),
            action: (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Switch checked={item.status === true} color="primary" disabled />
                    <CustomButton type="edit" onClick={() => handleEditClick(item)} />
                </Box>
            ),
        }));

    const columns = [
        { id: 'provider_name', label: 'PROVIDER NAME', minWidth: 170 },
        { id: 'country_id', label: 'COUNTRY ID', minWidth: 150 },
        { id: 'unit_rate', label: 'UNIT RATE', minWidth: 150 },
        { id: 'provider_category', label: 'PROVIDER CATEGORY', minWidth: 200 },
        { id: 'status', label: 'STATUS', minWidth: 120 },
        { id: 'action', label: '', minWidth: 180 },
    ];

    return (
        <>
            {!showForm && !showEditModal && (
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <CustomTable
                        columns={columns}
                        rows={
                            tableLoading
                                ? [{
                                    provider_name: (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                            <CircularProgress />
                                        </Box>
                                    ),
                                    country_id: '',
                                    unit_rate: '',
                                    provider_category: '',
                                    status: '',
                                    action: '',
                                }]
                                : formatRows(filteredRates)
                        }
                        showAddButton
                        addButtonTitle="Add Provider"
                        addButtonStyle={{ marginTop: '40px' }}
                        searchPlaceholder="Search by provider etc"
                        onAddButtonClick={handleAddButtonClick}
                        sx={{ '& .MuiTableCell-root': { padding: '12px' } }}
                    />
                </Box>
            )}

            {showForm && <AddProviderForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />}

            {showEditModal && selectedProvider && (
                <EditProviderModal
                    open={showEditModal}
                    provider={selectedProvider}
                    onClose={handleEditModalClose}
                    onUpdate={handleUpdate}
                    countries={countries}
                />
            )}
        </>
    );
};

export default ProviderTable;