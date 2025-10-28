import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AddForm from "../../../../components/AddForm";
import PasswordModal from "../../Card/PasswordModal";
import CustomErrorToast from "../../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../../components/CustomSuccessToast";
import { useAddProviders } from "../../../../Hooks/useProvider";

const CreateProvidersForm = ({ handleCancel, onSuccess }) => {
    const addProviders = useAddProviders(); // ✅ initialize the hook

    const [activityPin, setActivityPin] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [pendingFormData, setPendingFormData] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);

    // ✅ Initial form values
    const initialFormValues = useMemo(
        () => ({
            provider_name: "",
            provider_category_id: "",
            country_id: "",
            unit_rate: "",
            provider_image: "",
            status: 1,
        }),
        []
    );

    // ✅ Fields for AddForm
    const fields = useMemo(
        () => [
            { name: "question", label: "Question", type: "text", required: true },
            { name: "answer", label: "Answer", type: "text", required: true },
        ],
        []
    );

    // ✅ Main form submission
    const handleSubmit = (data) => {
        if (!data.question || !data.answer) {
            CustomErrorToast("All required fields must be filled.");
            return;
        }

        if (!passwordVerified) {
            setPendingFormData(data);
            setShowPasswordModal(true);
            return;
        }

        submitFaq(data);
    };

    const submitFaq = async (ProviderData) => {
        const payload = {
            question: faqData.question,
            answer: faqData.answer,
        };

        const result = await addFaq(payload, activityPin);

        if (result?.error === 0 || result?.success) {
            CustomSuccessToast("Providers added successfully!");
            handleCancel();
            onSuccess?.();
            setActivityPin("");
            setPasswordVerified(true);
            setPendingFormData(null);
            setShowPasswordModal(false);
        } else {
            CustomErrorToast(result?.message || "Failed to add Providers");
        }
    };

    // ✅ When password is submitted
    const handlePasswordSubmit = async () => {
        if (!activityPin.trim() || !pendingFormData) return;
        setPasswordLoading(true);
        await submitFaq(pendingFormData);
        setPasswordLoading(false);
    };

    // ✅ Close modal
    const handlePasswordModalClose = () => {
        setPendingFormData(null);
        setShowPasswordModal(false);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <AddForm
                title="ADD PROVIDER"
                description="Fill in the question and answer to add a new Provider."
                textFields={fields}
                initialValues={initialFormValues}
                onSubmit={handleSubmit}
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

export default CreateProvidersForm;
