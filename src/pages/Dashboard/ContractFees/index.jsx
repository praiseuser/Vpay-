import React, { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";

const ContractFees = ({ contract, onAddButtonClick, onEditButtonClick, loading }) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "serial", label: "S/N", minWidth: 80 },
    { id: "token_type", label: "TOKEN TYPE", minWidth: 200 },
    { id: "fee_name", label: "FEE NAME", minWidth: 200 },
    { id: "fee_type", label: "FEE TYPE", minWidth: 200 },
    { id: "fee_amount", label: "FEE AMOUNT", minWidth: 200 },
    { id: "has_max_limit", label: "HAS MAX LIMIT", minWidth: 200 },
    { id: "max_limit", label: "MAX LIMIT", minWidth: 200 },
    { id: "network", label: "NETWORK", minWidth: 200 },
    { id: "status", label: "STATUS", minWidth: 150 },
    { id: "action", label: "ACTION", minWidth: 150 },
  ];

  useEffect(() => {
    if (contract && !loading) {
      const contractArray = Array.isArray(contract) ? contract : [contract];

      const formatted = contractArray.map((item, index) => ({
        serial: <span className="table-text font-weight-500">{index + 1}</span>,

        token_type: (
          <span className="table-text font-weight-600">
            {item.tokenType || "N/A"}
          </span>
        ),

        fee_name: (
          <span className="table-text font-weight-500">{item.feeName || "N/A"}</span>
        ),

        fee_type: (
          <span className="table-text font-weight-600">{item.feeType || "N/A"}</span>
        ),

        fee_amount: (
          <span className="table-text font-weight-600">{item.feeAmount || "N/A"}</span>
        ),

        has_max_limit: (
          <span className="table-text font-weight-600">
            {item.hasMaxLimit ? "True" : "False"}
          </span>
        ),

        max_limit: (
          <span className="table-text font-weight-600">{item.maxLimit || "N/A"}</span>
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

ContractFees.propTypes = {
  contract: PropTypes.array,
  onAddButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired, 
  loading: PropTypes.bool,
};

ContractFees.defaultProps = {
  contract: [],
  loading: false,
};

export default ContractFees;
