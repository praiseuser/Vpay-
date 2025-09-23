import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import CustomTable from "../../../../components/CustomTable";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility"; // 👈 correct icon
import BouncingLoader from "../../../../components/BouncingLoader";
import { useNavigate } from "react-router-dom"; // 👈 navigation

const userStyles = {
  styledTableCell: {
    fontFamily: "Mada",
    "&.table-text": {
      color: "#888B93",
      "&.font-weight-600": { fontWeight: 600 },
      "&.font-weight-400": { fontWeight: 400 },
    },
  },
};

const StyledTableCell = styled("span")(({ theme }) => userStyles.styledTableCell);

const StyledEmailPhoneCell = styled("span")({
  fontFamily: "Mada",
  "&.table-text": {
    color: "#888B93",
    "&.font-weight-600": { fontWeight: 600 },
    "&.font-weight-400": { fontWeight: 400 },
  },
});

const columns = [
  { id: "id", label: "S/N", minWidth: 70 },
  { id: "firstname", label: "FIRST NAME", minWidth: 150 },
  { id: "lastname", label: "LAST NAME", minWidth: 150 },
  { id: "email", label: "EMAIL", minWidth: 200 },
  { id: "status", label: "STATUS", minWidth: 120 },
  { id: "phone", label: "PHONE", minWidth: 150 },
  { id: "gender", label: "GENDER", minWidth: 120 },
  { id: "action", label: "ACTIONS", minWidth: 100 }, 
];

const UserTable = ({ users, loading, error }) => {
  const navigate = useNavigate();

  const formatRows = (data) => {
    if (!data || data.length === 0) {
      console.warn("⚠️ No users passed into UserTable");
      return [];
    }

    return data.map((item, index) => {
      const handleViewClick = () => {
        console.log("👁 Navigating to details page for user id:", item.id);
        navigate(`/dashboard/details-page/${item.id}`); // ✅ Now includes id
      };

      return {
        id: (
          <StyledTableCell className="table-text font-weight-600">
            {index + 1}
          </StyledTableCell>
        ),
        firstname: (
          <StyledTableCell className="table-text font-weight-400">
            {item.firstname || "N/A"}
          </StyledTableCell>
        ),
        lastname: (
          <StyledTableCell className="table-text font-weight-400">
            {item.lastname || "N/A"}
          </StyledTableCell>
        ),
        email: (
          <StyledEmailPhoneCell className="table-text font-weight-500">
            {item.email || "N/A"}
          </StyledEmailPhoneCell>
        ),
        status: (
          <StyledTableCell>
            <Chip
              label={item.status === 1 ? "Active" : "Inactive"}
              color={item.status === 1 ? "success" : "default"}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </StyledTableCell>
        ),
        phone: (
          <StyledEmailPhoneCell className="table-text font-weight-500">
            {item.phone || "N/A"}
          </StyledEmailPhoneCell>
        ),
        gender: (
          <StyledTableCell className="table-text font-weight-400">
            {item.gender || "N/A"}
          </StyledTableCell>
        ),
        action: (
          <StyledTableCell>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Tooltip title="View Details">
                <IconButton size="small" onClick={handleViewClick}>
                  <VisibilityIcon style={{ color: "#1976d2" }} />
                </IconButton>
              </Tooltip>
              <ArrowForwardIosIcon
                style={{ width: "15px", height: "15px", color: "#73757C" }}
              />
            </div>
          </StyledTableCell>
        ),
      };
    });
  };

  console.log(
    "📊 Rendering UserTable. Users length:",
    users?.length || 0,
    "Loading:",
    loading,
    "Error:",
    error
  );

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ position: "relative", minHeight: "300px" }}>
      <CustomTable
        columns={columns}
        rows={formatRows(users || [])}
        showAddButton={false}
        sx={{
          "& .MuiTableCell-root": { padding: "12px" },
          opacity: loading ? 0.5 : 1,
          position: "relative",
          zIndex: 0,
        }}
      />
      {(!users || users.length === 0 || loading) && (
        <Box
          sx={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            marginTop: "20px",
          }}
        >
          <BouncingLoader />
        </Box>
      )}
    </Box>
  );
};



export default UserTable;
