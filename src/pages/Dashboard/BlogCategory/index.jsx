import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../../../components/CustomTable";
import CustomLoader from "../../../components/CustomLoader";
import CustomButton from "../../../components/CustomButton";


const BlogCategory = ({
  categories,
  onAddButtonClick,
  onEditClick,
  loading,
}) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "serial", label: "S/N", minWidth: 80 },
    { id: "name", label: "NAME", minWidth: 200 },
    { id: "description", label: "DESCRIPTION", minWidth: 300 },
    { id: "status", label: "STATUS", minWidth: 300 },
    { id: "action", label: "ACTION", minWidth: 200 },
  ];

  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      const formatted = categories.map((item, index) => ({
        serial: <span className="table-text font-weight-500">{index + 1}</span>,
        name: <span className="table-text font-weight-600">{item.name || "N/A"}</span>,
        description: (
          <span
            className="table-text"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 250,
            }}
          >
            {item.description || "N/A"}
          </span>
        ),
        status: <CustomButton type={item.status === 'active' ? 'red' : 'green'} />,
        action: (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CustomButton type="edit" onClick={() => onEditClick(item)} />
          </Box>
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
        addButtonTitle="Add Category"
        addButtonStyle={{ marginTop: "40px" }}
        searchPlaceholder="Search category..."
        onAddButtonClick={onAddButtonClick}
      />
    </Box>
  );
};

BlogCategory.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  onAddButtonClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

BlogCategory.defaultProps = {
  categories: [],
  loading: false,
};

export default BlogCategory;
