import React, { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";

const ContractToken = ({ contract, onAddButtonClick, onEditButtonClick, loading }) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "serial", label: "S/N", minWidth: 80 },
    { id: "token_type", label: "TOKEN TYPE", minWidth: 200 },
    { id: "token_contract", label: "TOKEN CONTRACT", minWidth: 200 },
    { id: "decimals", label: "DECIMALS", minWidth: 100 },
    { id: "base_gas_estimate", label: "BASE GAS ESTIMATE", minWidth: 200 },
    { id: "gas_multiplier", label: "GAS MULTIPLIER", minWidth: 150 },
    { id: "requires_approval", label: "REQUIRES APPROVAL", minWidth: 200 },
    { id: "network", label: "NETWORK", minWidth: 150 },
    { id: "status", label: "STATUS", minWidth: 150 },
    { id: "action", label: "ACTION", minWidth: 150 },
  ];

  useEffect(() => {
    if (contract && !loading) {
      const contractArray = Array.isArray(contract) ? contract : [contract];

      const formatted = contractArray.map((item, index) => ({
        serial: <span className="table-text font-weight-500">{index + 1}</span>,

        token_type: (
          <span className="table-text font-weight-600">{item.tokenType || "N/A"}</span>
        ),

        token_contract: (
          <span className="table-text font-weight-500">{item.tokenContract || "N/A"}</span>
        ),

        decimals: (
          <span className="table-text font-weight-600">{item.decimals ?? "N/A"}</span>
        ),

        base_gas_estimate: (
          <span className="table-text font-weight-600">{item.baseGasEstimate ?? "N/A"}</span>
        ),

        gas_multiplier: (
          <span className="table-text font-weight-600">{item.gasMultiplier ?? "N/A"}</span>
        ),

        requires_approval: (
          <span className="table-text font-weight-600">
            {item.requiresApproval ? "Yes" : "No"}
          </span>
        ),

        network: (
          <span className="table-text font-weight-500">{item.network || "N/A"}</span>
        ),

        status: (
          <Chip
            label={item.status ? "Active" : "Inactive"}
            color={item.status ? "success" : "error"}
            size="small"
            variant="outlined"
          />
        ),

        action: (
          <CustomButton
            title="Edit"
            variant="outlined"
            onClick={() => onEditButtonClick(item)}
            style={{ padding: "5px 15px", borderRadius: "6px" }}
          />
        ),
      }));

      setRows(formatted);
    }
  }, [contract, loading, onEditButtonClick]);

  return (
    <Box>
      <CustomTable
        columns={columns}
        rows={
          loading
            ? [
                {
                  serial: "",
                  token_type: (
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
        addButtonTitle="Add Contract"
        addButtonStyle={{ marginTop: "40px" }}
        onAddButtonClick={onAddButtonClick}
      />
    </Box>
  );
};

ContractToken.propTypes = {
  contract: PropTypes.array,
  onAddButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ContractToken.defaultProps = {
  contract: [],
  loading: false,
};

export default ContractToken;
