import React, { useState } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useUpdateFaq } from "../../../../Hooks/useFaq";

const EditFaq = ({ faqData, onUpdateSuccess, onCancel }) => {
  const updateFaq = useUpdateFaq(); 

  const [activityPin, setActivityPin] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);

  const fields = [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Answer", type: "textarea", required: true },
  ];

  const initialFormValues = {
    question: faqData?.question || "",
    answer: faqData?.answer || "",
  };

  const handleSubmit = async (data) => {
    if (!data.question || !data.answer) {
      CustomErrorToast("Please fill in both the question and the answer.");
      return;
    }

    if (passwordVerified) {
      const result = await updateFaq(faqData.id, data, activityPin);
      if (result?.error === 0 || result?.code === 0) {
        CustomSuccessToast("FAQ updated successfully!");
        onUpdateSuccess();
      }
    } else {
      setPendingFormData(data);
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim() || !pendingFormData) return;

    setPasswordLoading(true);
    const result = await updateFaq(faqData.id, pendingFormData, activityPin);
    setPasswordLoading(false);

    if (result?.error === 0 || result?.code === 0) {
      CustomSuccessToast("FAQ updated successfully!");
      setActivityPin("");
      setPendingFormData({});
      setPasswordVerified(true);
      setShowPasswordModal(false);
      onUpdateSuccess();
    }
  };

  const handlePasswordModalClose = () => {
    setPendingFormData({});
    setShowPasswordModal(false);
    onCancel();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AddForm
        title="EDIT FAQ"
        description="Update the FAQ details below."
        textFields={fields}
        onSubmit={handleSubmit}
        initialValues={initialFormValues}
        submitText="Update FAQ"
      />

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
};

export default EditFaq;
