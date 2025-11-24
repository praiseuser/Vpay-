import { useState } from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DetailsPage from "../../../../pages/Dashboard/DetailsPage/";
import FiatDetail from "../../DetailsPage/FiatDetail";

const UserDetailsWrapper = ({ userId, onBack }) => {
  const [view, setView] = useState("details");
  const [selectedFiatAsset, setSelectedFiatAsset] = useState(null);

  const handleBackToDetails = () => {
    setView("details");
    setSelectedFiatAsset(null);
  };

  const handleViewAllFiat = (asset) => {
    setSelectedFiatAsset(asset);
    setView("fiat");
  };

  const buttonStyle = {
    mb: 2,
    px: 2,
    py: 1,
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "13px",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    border: "1px solid #d1d5db",
    width: "fit-content",

    "&:hover": {
      backgroundColor: "#f8fafc",
      borderColor: "#cbd5e1",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    },
  };

  return (
    <Box>
      {view === "details" && (
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={buttonStyle}>
          Back to Users
        </Button>
      )}

      {view === "fiat" && selectedFiatAsset && (
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToDetails}
          sx={buttonStyle}
        >
          Back to Details
        </Button>
      )}

      {view === "details" && (
        <DetailsPage userId={userId} onViewAllFiat={handleViewAllFiat} />
      )}

      {view === "fiat" && selectedFiatAsset && (
        <FiatDetail asset={selectedFiatAsset} />
      )}
    </Box>
  );
};

export default UserDetailsWrapper;
