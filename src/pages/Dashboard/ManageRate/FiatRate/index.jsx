import { useState } from 'react';
import { Box } from '@mui/material';
import { useDeleteRate, useViewRate, useFetchRateCurrencies } from '../../../../Hooks/useRateCurrency';
import EditRateModal from '../FiatRate/EditRateModal';
import RateTable from '../FiatRate/RateTable';
import ErrorMessage from '../FiatRate/ErrorMessage';
import ViewRateModal from '../FiatRate/ViewRateModal';

const FiatRate = ({ onAddButtonClick }) => {
  const { rateCurrencies, loading, error } = useFetchRateCurrencies();
  const { deleteRate, isRateLoading, error: deleteError } = useDeleteRate();
  const { rate, loading: viewLoading, error: viewError, fetchRate } = useViewRate();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [activeRateId, setActiveRateId] = useState(null);

  const handleDelete = async (id) => {
    if (!id) {
      console.error('FiatRate - handleDelete: No currency_id provided');
      return;
    }
    await deleteRate(id);
  };

  const handleEditClick = (rateData) => {
    setSelectedRate(rateData);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRate(null);
  };

  const handleViewClick = async (id) => {
    if (!id) {
      console.error('FiatRate - handleViewClick: No currency_id provided');
      return;
    }
    setActiveRateId(id);
    try {
      console.log('View button clicked for rate ID:', id);
      await fetchRate(id);
      setViewModalOpen(true);
      console.log('View modal opened for rate ID:', id);
    } catch (err) {
      console.error('Failed to fetch rate details for ID:', id);
    } finally {
      setActiveRateId(null);
    }
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <RateTable
        rateCurrencies={rateCurrencies}
        isRateLoading={isRateLoading}
        activeRateId={activeRateId}
        viewLoading={viewLoading}
        onAddButtonClick={onAddButtonClick}
        onDelete={handleDelete}
        onEdit={handleEditClick}
        onView={handleViewClick}
      />
      <ErrorMessage error={error || deleteError || viewError} />
      <EditRateModal
        open={modalOpen}
        onClose={handleModalClose}
        rateData={selectedRate}
      />
      <ViewRateModal
        open={viewModalOpen}
        onClose={handleViewModalClose}
        rate={rate}
        loading={viewLoading}
      />
    </Box>
  );
};

export default FiatRate;