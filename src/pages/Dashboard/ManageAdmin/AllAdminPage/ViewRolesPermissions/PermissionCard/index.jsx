import { Paper, Checkbox, Typography, Box, Chip } from "@mui/material";
import CustomSwitch from "../../../../../../components/CustomSwitch";

const permissionsList = ["create", "read", "update", "delete"];

const PermissionCard = ({
  adminTypeId,
  module = {}, 
  setFormattedPermissions,
  handlePermissionChange,
  handleAdminTypeToggle,
  index,
}) => {
  const checked = module.checked || false;

  const handleToggle = () => {
    const isEnabled = !checked;
    setFormattedPermissions((prev) => ({
      ...prev,
      [adminTypeId]: {
        ...prev[adminTypeId],
        checked: isEnabled,
        displayName: prev[adminTypeId]?.displayName || module.displayName || `Role ${adminTypeId}`,

        
        ...(isEnabled
          ? {}
          : { create: false, read: false, update: false, delete: false }),
      },
    }));
    handleAdminTypeToggle(adminTypeId, isEnabled);
  };


  const handleSwitchChange = (perm) => {
    const newValue = !module[perm];
    setFormattedPermissions((prev) => ({
      ...prev,
      [adminTypeId]: { ...prev[adminTypeId], [perm]: newValue },
    }));
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
        animationDelay: `${index * 0.1}s`,
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
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{ fontFamily: "Inter, sans-serif", color: "#2d3748" }}
        >
          {module.displayName || `Role ${adminTypeId}`}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        {permissionsList.map((perm) => (
          <Box key={perm} textAlign="center">
            <Typography
              variant="caption"
              display="block"
              mb={0.5}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.3px",
                color: "#4a5568",
                textTransform: "capitalize",
              }}
            >
              {perm}
            </Typography>
            <CustomSwitch
              checked={module[perm] || false}
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
