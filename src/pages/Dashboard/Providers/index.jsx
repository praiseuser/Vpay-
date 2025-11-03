import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";
import PasswordModal from "../Card/PasswordModal";
import { useDeleteProviders } from "../../../Hooks/useProviderName";
import CustomSuccessToast from "../../../components/CustomSuccessToast";
import CustomErrorToast from "../../../components/CustomErrorToast";

const Providers = ({
    providers,
    onAddButtonClick,
    loading,
    onEditClick,
    onDeleteClick,
}) => {
    const [rows, setRows] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [activityPin, setActivityPin] = useState("");
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const deleteProvider = useDeleteProviders();

    const columns = [
        { id: "serial", label: "S/N", minWidth: 80 },
        { id: "provider_name", label: "PROVIDER NAME", minWidth: 200 },
        { id: "country", label: "COUNTRY", minWidth: 200 },
        { id: "unit_rate", label: "UNIT RATE", minWidth: 200 },
        { id: "provider_category", label: "PROVIDER CATEGORY", minWidth: 200 },
        { id: "provider_image", label: "PROVIDER IMAGE", minWidth: 200 },
        { id: "status", label: "STATUS", minWidth: 120 },
        { id: "action", label: "ACTIONS", minWidth: 180 },
    ];

    useEffect(() => {
        if (providers && Array.isArray(providers)) {
            const formatted = providers.map((item, index) => ({
                serial: <span className="table-text font-weight-500">{index + 1}</span>,
                provider_name: (
                    <span className="table-text font-weight-600">
                        {item.provider_name || "N/A"}
                    </span>
                ),
                country: <span className="table-text">{item.country_id ?? "N/A"}</span>,
                unit_rate: <span className="table-text">{item.unit_rate || "N/A"}</span>,
                provider_category: (
                    <span className="table-text">
                        {item.provider_category_id ?? "N/A"}
                    </span>
                ),
                provider_image: (
                    <span className="table-text">{item.provider_image || "N/A"}</span>
                ),
                status: (
                    <CustomButton
                        type={item.status === 1 ? "green" : "red"}
                        title={item.status === 1 ? "Active" : "Inactive"}
                    />
                ),
                action: (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CustomButton
                            type="edit"
                            onClick={() => onEditClick?.(item)} 
                        />
                        {item.deleting ? (
                            <CircularProgress size={24} color="error" />
                        ) : (
                            <CustomButton
                                type="delete"
                                onClick={() => handleDeleteClick(item)}
                            />
                        )}
                    </Box>
                ),

            }));
            setRows(formatted);
        }
    }, [providers, loading, onEditClick]);

    const handleDeleteClick = (provider) => {
        setSelectedProvider(provider);
        setShowPasswordModal(true);
    };

    // ✅ Submit deletion
    const handlePasswordSubmit = async () => {
        if (!activityPin.trim()) {
            CustomErrorToast("Please enter your Activity PIN.");
            return;
        }

        setPasswordLoading(true);
        try {
            const result = await deleteProvider(selectedProvider.id, activityPin);

            if (result?.success || result?.error === 0 || result?.code === 0) {
                CustomSuccessToast(result?.message || "Provider deleted successfully!");
                onDeleteClick?.();
            } else {
                CustomErrorToast(result?.message || "Failed to delete provider!");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            CustomErrorToast("An error occurred while deleting the provider!");
        } finally {
            setPasswordLoading(false);
            setShowPasswordModal(false);
            setActivityPin("");
            setSelectedProvider(null);
        }
    };

    // ✅ Close modal
    const handlePasswordModalClose = () => {
        setShowPasswordModal(false);
        setSelectedProvider(null);
        setActivityPin("");
    };

    return (
        <Box>
            <CustomTable
                columns={columns}
                rows={
                    loading
                        ? [
                            {
                                serial: "",
                                provider_name: (
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
                addButtonTitle="Add Provider"
                addButtonStyle={{ marginTop: "40px" }}
                searchPlaceholder="Search providers..."
                onAddButtonClick={onAddButtonClick}
            />

            {/* ✅ Password Modal for Delete */}
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

Providers.propTypes = {
    providers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            provider_name: PropTypes.string,
            provider_image: PropTypes.string,
            country_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            provider_category_id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            unit_rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            status: PropTypes.number,
        })
    ),
    onAddButtonClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func, // ✅ refetch function
    onEditClick: PropTypes.func,
    loading: PropTypes.bool,
};

Providers.defaultProps = {
    providers: [],
    loading: false,
};

export default Providers;
