import { useState } from "react";
import { Box } from "@mui/material";
import {
  useDeleteRate,
  useViewRate,
  useFetchRateCurrencies,
} from "../../../../Hooks/useRateCurrency";
import EditRateModal from "../FiatRate/EditRateModal";
import RateTable from "../FiatRate/RateTable";
import ErrorMessage from "../FiatRate/ErrorMessage";
import ViewRateModal from "../FiatRate/ViewRateModal";
import PasswordModal from "../../Card/PasswordModal";

const FiatRate = ({ onAddButtonClick, onEditRate }) => {
  const { rateCurrencies, loading, error } = useFetchRateCurrencies();

  const {
    deleteRate,
    isRateLoading,
    error: deleteError,
    successMessage,
    showPasswordModal,
    activityPin,
    setActivityPin,
    pinLoading,
    resetState,
    currentRateId,
  } = useDeleteRate();

  const {
    rate,
    loading: viewLoading,
    error: viewError,
    fetchRate,
  } = useViewRate();

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [activeRateId, setActiveRateId] = useState(null);

  const handleDelete = async (id) => {
    if (!id) {
      console.error("FiatRate - handleDelete: No currency_id provided");
      return;
    }
    await deleteRate(id);
  };

  const handleEdit = (rateData) => {
    onEditRate(rateData); // Pass the rate data to parent
  };


  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRate(null);
  };

  const handleViewClick = async (id) => {
    if (!id) {
      console.error("FiatRate - handleViewClick: No currency_id provided");
      return;
    }
    setActiveRateId(id);
    try {
      await fetchRate(id);
      setViewModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch rate details for ID:", id, err);
    } finally {
      setActiveRateId(null);
    }
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim()) {
      return;
    }
    await deleteRate(currentRateId, activityPin);
  };

  const handlePasswordModalClose = () => {
    resetState();
  };

  return (
    <Box sx={{ position: "relative" }}>
      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={pinLoading}
      />

      <Box
        sx={{
          opacity: showPasswordModal ? 0.3 : 1,
          pointerEvents: showPasswordModal ? "none" : "auto",
          transition: "opacity 0.3s ease",
        }}
      >
        <RateTable
          rateCurrencies={rateCurrencies}
          isRateLoading={isRateLoading}
          activeRateId={activeRateId}
          viewLoading={viewLoading}
          onAddButtonClick={onAddButtonClick}
          onDelete={handleDelete}
          onEdit={handleEdit}
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
    </Box>
  );
};

export default FiatRate;
