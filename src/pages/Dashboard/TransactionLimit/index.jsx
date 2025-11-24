import React, { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";
import PasswordModal from "../Card/PasswordModal";
import CustomSuccessToast from "../../../components/CustomSuccessToast";
import CustomErrorToast from "../../../components/CustomErrorToast";

const TransactionLimit = ({
  limits,
  onAddButtonClick,
  loading,
  onEditClick,
}) => {
  const [rows, setRows] = useState([]);
  const [activityPin, setActivityPin] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordSubmit = async () => {
    if (!activityPin.trim()) {
      CustomErrorToast("Please enter your Activity PIN.");
      return;
    }

    setPasswordLoading(true);

    setTimeout(() => {
      setPasswordLoading(false);
      setShowPasswordModal(false);
      CustomSuccessToast("PIN verified successfully!");
      setActivityPin("");
    }, 1200);
  };

  const columns = [
    { id: "serial", label: "S/N", minWidth: 80 },
    { id: "account_tier", label: "ACCOUNT TIER", minWidth: 200 },
    { id: "transaction_type", label: "TRANSACTION TYPE", minWidth: 200 },
    { id: "fiat_id", label: "FIAT ID", minWidth: 200 },
    { id: "token_id", label: "TOKEN ID", minWidth: 200 },
    { id: "single_transaction_limit", label: "SINGLE LIMIT", minWidth: 200 },
    { id: "daily_limit", label: "DAILY LIMIT", minWidth: 200 },
    { id: "weekly_limit", label: "WEEKLY LIMIT", minWidth: 200 },
    { id: "monthly_limit", label: "MONTHLY LIMIT", minWidth: 200 },
    { id: "status", label: "STATUS", minWidth: 140 },
    { id: "action", label: "ACTION", minWidth: 140 },
  ];

  useEffect(() => {
    if (limits && Array.isArray(limits)) {
      const formatted = limits.map((item, index) => ({
        serial: <span className="table-text font-weight-500">{index + 1}</span>,
        account_tier: (
          <span className="table-text">{item.account_tier ?? "N/A"}</span>
        ),
        transaction_type: (
          <span className="table-text">{item.transaction_type ?? "N/A"}</span>
        ),
        fiat_id: <span className="table-text">{item.fiat_id ?? "N/A"}</span>,
        token_id: <span className="table-text">{item.token_id ?? "N/A"}</span>,
        single_transaction_limit: (
          <span className="table-text">
            {item.single_transaction_limit
              ? Number(item.single_transaction_limit).toLocaleString()
              : "N/A"}
          </span>
        ),
        daily_limit: (
          <span className="table-text">
            {item.daily_limit
              ? Number(item.daily_limit).toLocaleString()
              : "N/A"}
          </span>
        ),
        weekly_limit: (
          <span className="table-text">
            {item.weekly_limit
              ? Number(item.weekly_limit).toLocaleString()
              : "N/A"}
          </span>
        ),
        monthly_limit: (
          <span className="table-text">
            {item.monthly_limit
              ? Number(item.monthly_limit).toLocaleString()
              : "N/A"}
          </span>
        ),
        status: (
          <Chip
            label={item.status === 1 ? "Active" : "Inactive"}
            variant="outlined"
            color={item.status === 1 ? "success" : "error"}
            size="small"
          />
        ),
        action: (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CustomButton type="edit" onClick={() => onEditClick?.(item)} />
          </Box>
        ),
      }));

      setRows(formatted);
    }
  }, [limits, loading, onEditClick]);

  return (
    <Box>
      <CustomTable
        columns={columns}
        rows={
          loading
            ? [
                {
                  serial: "",
                  account_tier: (
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
        addButtonTitle="Add Limit"
        addButtonStyle={{ marginTop: "40px" }}
        searchPlaceholder="Search..."
        onAddButtonClick={onAddButtonClick}
      />

      <PasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        password={activityPin}
        setPassword={setActivityPin}
        loading={passwordLoading}
        error={null}
      />
    </Box>
  );
};

TransactionLimit.propTypes = {
  limits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      account_tier: PropTypes.string,
      transaction_type: PropTypes.string,
      fiat_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      token_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      single_transaction_limit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      daily_limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      weekly_limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      monthly_limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      status: PropTypes.number,
    })
  ),
  onAddButtonClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  loading: PropTypes.bool,
};

TransactionLimit.defaultProps = {
  limits: [],
  loading: false,
};

export default TransactionLimit;
