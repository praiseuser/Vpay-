// PermissionCard.jsx — FIXED VERSION
import { Paper, Checkbox, Typography, Box, Chip } from "@mui/material";
import CustomSwitch from "../../../../../../components/CustomSwitch";

const permissionsList = ["create", "read", "update", "delete"];

const PermissionCard = ({
  adminTypeId,
  module = {},
  handleAdminTypeToggle,      
  handlePermissionChange, 
}) => {
  const checked = module.checked || false;

  const handleToggle = () => {
    const isEnabled = !checked;
    handleAdminTypeToggle(adminTypeId, isEnabled);
  };

  const handleSwitchChange = (perm) => {
    const newValue = !module[perm];
    handlePermissionChange(adminTypeId, perm, newValue); 
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        position: "relative",
        opacity: 0,
        transform: "translateY(20px)",
        animation: `fadeSlideUp 0.6s ease forwards`,
        animationDelay: `${module.index || 0 * 0.1}s`,
        "@keyframes fadeSlideUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Chip
        label={checked ? "Active" : "Inactive"}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          bgcolor: checked ? "#e6fffa" : "#edf2f7",
          color: checked ? "#008080" : "#718096",
          fontWeight: 600,
        }}
      />

      <Box display="flex" alignItems="center" mb={1}>
        <Checkbox checked={checked} onChange={handleToggle} sx={{ mr: 1 }} />
        <Typography variant="subtitle1" fontWeight="600">
          {module.displayName || `Role ${adminTypeId}`}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        {permissionsList.map((perm) => (
          <Box key={perm} textAlign="center">
            <Typography variant="caption" display="block" mb={0.5} sx={{ textTransform: "capitalize" }}>
              {perm}
            </Typography>
            <CustomSwitch
              checked={!!module[perm]}
              disabled={!checked}
              onChange={() => handleSwitchChange(perm)}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default PermissionCard;