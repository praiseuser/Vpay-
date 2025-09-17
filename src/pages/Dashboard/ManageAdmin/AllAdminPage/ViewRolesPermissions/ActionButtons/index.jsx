import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

const ActionButtons = ({ onBack, onSave, isUpdating }) => (
  <Box mt={4} display="flex" justifyContent="space-between">
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={onBack}
      sx={{ borderRadius: "10px", px: 3, fontWeight: 600 }}
    >
      Back
    </Button>
    <Button
      variant="contained"
      startIcon={<SaveIcon />}
      sx={{
        borderRadius: "10px",
        px: 4,
        fontWeight: 600,
        bgcolor: "#008080",
        "&:hover": { bgcolor: "#006666" },
      }}
      disabled={isUpdating}
      onClick={onSave}
    >
      {isUpdating ? "Updating..." : "Update Role"}
    </Button>
  </Box>
);

export default ActionButtons;
