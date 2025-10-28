import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";
import PasswordModal from "../Card/PasswordModal";
import CustomSuccessToast from "../../../components/CustomSuccessToast";
import CustomErrorToast from "../../../components/CustomErrorToast";
import ViewFaqModal from "./ViewFaqModal";
import { useDeleteFaq } from "../../../Hooks/useFaq";
import { useViewFaq } from "../../../Hooks/useFaq";

const Faq = ({
    faqs,
    onAddButtonClick,
    loading,
    onDeleteSuccess,
    onEditClick,
}) => {
    const [rows, setRows] = useState([]);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [activityPin, setActivityPin] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // "delete" or "view"
    const [pendingId, setPendingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    const deleteFaq = useDeleteFaq();
    const viewFaq = useViewFaq();

    // ===== TABLE COLUMNS =====
    const columns = [
        { id: "serial", label: "S/N", minWidth: 80 },
        { id: "question", label: "QUESTION", minWidth: 300 },
        { id: "answer", label: "ANSWER", minWidth: 400 },
        { id: "action", label: "ACTIONS", minWidth: 180 },
    ];

    // ===== DELETE CLICK =====
    const handleDeleteClick = (id) => {
        setPendingId(id);
        setPendingAction("delete");
        setShowPasswordModal(true);
    };

    // ===== VIEW CLICK =====
    const handleViewClick = (id) => {
        setPendingId(id);
        setPendingAction("view");
        setShowPasswordModal(true);
    };

    const handlePasswordSubmit = async () => {
        if (!activityPin.trim()) return;
        setPasswordLoading(true);

        try {
            if (pendingAction === "delete") {
                const result = await deleteFaq(pendingId, activityPin);
                if (result?.success || result?.code === 0) {
                    CustomSuccessToast("FAQ deleted successfully!");
                    onDeleteSuccess?.(pendingId);
                } else {
                    CustomErrorToast(result?.message || "Failed to delete FAQ!");
                }
            } else if (pendingAction === "view") {
                const result = await viewFaq(pendingId, activityPin);
                const faqData = result?.result?.[0];
                if (faqData) {
                    setSelectedFaq(faqData);
                    setShowViewModal(true);
                    CustomSuccessToast(result?.message || "FAQ retrieved successfully!");
                } else {
                    CustomErrorToast("No FAQ details found!");
                }
            }
        } catch (error) {
            console.error(error);
            CustomErrorToast("An error occurred!");
        } finally {
            setPasswordLoading(false);
            setActivityPin("");
            setShowPasswordModal(false);
            setPendingAction(null);
            setPendingId(null);
        }
    };


    const handlePasswordModalClose = () => {
        setShowPasswordModal(false);
        setPendingAction(null);
        setPendingId(null);
        setActivityPin("");
    };

    useEffect(() => {
        if (faqs && Array.isArray(faqs)) {
            const formatted = faqs.map((item, index) => ({
                serial: <span className="table-text font-weight-500">{index + 1}</span>,
                question: (
                    <span className="table-text font-weight-600">
                        {item.question || "N/A"}
                    </span>
                ),
                answer: <span className="table-text">{item.answer || "N/A"}</span>,
                action: (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CustomButton type="edit" onClick={() => onEditClick(item)} />
                        {deletingId === item.id ? (
                            <CircularProgress size={24} color="error" />
                        ) : (
                            <CustomButton
                                type="delete"
                                onClick={() => handleDeleteClick(item.id)}
                            />
                        )}
                        <CustomButton type="view" onClick={() => handleViewClick(item.id)} />
                    </Box>
                ),
            }));
            setRows(formatted);
        }
    }, [faqs, loading, deletingId]);

    return (
        <Box>
            <CustomTable
                columns={columns}
                rows={
                    loading
                        ? [
                            {
                                serial: "",
                                question: (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "150px",
                                            width: "100%",
                                            mt: 1,
                                        }}
                                    >
                                        <CustomLoader />
                                    </Box>
                                ),
                            },
                        ]
                        : rows
                }
                showAddButton={true}
                addButtonTitle="Add FAQ"
                addButtonStyle={{ marginTop: "40px" }}
                searchPlaceholder="Search frequently asked questions..."
                onAddButtonClick={onAddButtonClick}
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

            <ViewFaqModal
                open={showViewModal}
                onClose={() => setShowViewModal(false)}
                faq={selectedFaq}
            />
        </Box>
    );
};

Faq.propTypes = {
    faqs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            question: PropTypes.string,
            answer: PropTypes.string,
        })
    ),
    onAddButtonClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    onDeleteSuccess: PropTypes.func,
};

Faq.defaultProps = {
    faqs: [],
    loading: false,
};

export default Faq;
