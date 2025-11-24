import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import FeeTable from "../ManageFees/FeeTable";
import CreateFeeForm from "./AddFee";
import EditFeeForm from "./EditFeeForm";
import PasswordModal from "../Card/PasswordModal";
import { useGetFees, useDeleteFee } from "../../../Hooks/useFeeCurrency";

export default function ManageFees() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { feesData, loading: fetchLoading, refetch } = useGetFees();
  const deleteFee = useDeleteFee();

  const [fees, setFees] = useState([]);
  const [showAddFeeForm, setShowAddFeeForm] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activityPin, setActivityPin] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);


  useEffect(() => {
    setFees(feesData || []);
  }, [feesData]);

  const handleAddFeeClick = () => setShowAddFeeForm(true);
  const handleCancelAddFee = () => setShowAddFeeForm(false);
  const handleSuccessAddFee = () => {
    setShowAddFeeForm(false);
    refetch();
  };


  const handleEditFee = (fee) => {
    setEditingFee(fee);
  };
  const handleCancelEditFee = () => setEditingFee(null);
  const handleSuccessEditFee = () => {
    setEditingFee(null);
    refetch();
  };

  const handleDeleteClick = (id) => {
    setPendingDeleteId(id);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingDeleteId) return;

    setPasswordLoading(true);
    await deleteFee(pendingDeleteId, activityPin);
    setPasswordLoading(false);
    setActivityPin("");
    setPendingDeleteId(null);
    setShowPasswordModal(false);
    refetch();
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPendingDeleteId(null);
    setActivityPin("");
  };

  return (
    <Box
      className={`p-${isMobile ? "2" : "6"} w-full`}
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        {showAddFeeForm ? (
          <CreateFeeForm
            handleCancel={handleCancelAddFee}
            onSuccess={handleSuccessAddFee}
          />
        ) : editingFee ? (
          <EditFeeForm
            feeData={editingFee}
            handleCancel={handleCancelEditFee}
            onSuccess={handleSuccessEditFee}
          />
        ) : (
          <FeeTable
            fees={fees}
            fetchLoading={fetchLoading}
            onAddFeeClick={handleAddFeeClick}
            onEditFee={handleEditFee}
            onDeleteFee={handleDeleteClick}
          />
        )}
      </Box>

      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading}
        error={null}
      />
    </Box>
  );
}
