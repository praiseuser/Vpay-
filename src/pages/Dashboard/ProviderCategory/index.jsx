import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";

const ProviderCategory = ({
  categories,
  onAddButtonClick,
  onEditClick,
  loading,
}) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "serial", label: "S/N", minWidth: 80 },
    { id: "category_name", label: "CATEGORY NAME", minWidth: 200 },
    { id: "country", label: "COUNTRY", minWidth: 200 },
    { id: "status", label: "STATUS", minWidth: 300 },
  ];

  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      const formatted = categories.map((item, index) => ({
        serial: <span className="table-text font-weight-500">{index + 1}</span>,
        category_name: (
          <span className="table-text font-weight-600">
            {item.category_name || "N/A"}
          </span>
        ),
        country: (
          <span className="table-text">
            {item.country_name || item.country_id || "N/A"}
          </span>
        ),
        status: (
          <CustomButton
            type={item.status === 1 ? "green" : "red"}
            title={item.status === 1 ? "Active" : "Inactive"}
          />
        ),
      }));
      setRows(formatted);
    }
  }, [categories, loading, onEditClick]);

  return (
    <Box>
      <CustomTable
        columns={columns}
        rows={
          loading
            ? [
              {
                serial: "",
                name: (
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
        searchPlaceholder="Search provider..."
        onAddButtonClick={onAddButtonClick}
      />
    </Box>
  );
};

ProviderCategory.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      category_name: PropTypes.string,
      country_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      country_name: PropTypes.string,
      status: PropTypes.number,
    })
  ),
  onAddButtonClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  loading: PropTypes.bool,
};

ProviderCategory.defaultProps = {
  categories: [],
  loading: false,
};

export default ProviderCategory;
