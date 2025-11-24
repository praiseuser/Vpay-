// PermissionGrid.jsx
import { Grid } from "@mui/material";
import PermissionCard from "../PermissionCard";

const PermissionGrid = ({
  formattedPermissions,
  handleAdminTypeToggle,
  handlePermissionChange,
}) => (
  <Grid container spacing={3}>
    {Object.keys(formattedPermissions).map((adminTypeId, index) => {
      const module = formattedPermissions[adminTypeId];
      return (
        <Grid item xs={12} md={6} lg={4} key={adminTypeId}>
          <PermissionCard
            adminTypeId={adminTypeId}
            module={{ ...module, index }}
            handleAdminTypeToggle={handleAdminTypeToggle}
            handlePermissionChange={handlePermissionChange}
          />
        </Grid>
      );
    })}
  </Grid>
);

export default PermissionGrid;