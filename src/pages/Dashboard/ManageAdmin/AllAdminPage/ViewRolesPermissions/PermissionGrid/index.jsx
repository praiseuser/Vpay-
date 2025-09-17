import { Grid } from "@mui/material";
import PermissionCard from "../../ViewRolesPermissions/PermissionCard";

const PermissionGrid = ({ formattedPermissions, setFormattedPermissions, handlePermissionChange, handleAdminTypeToggle }) => {
  return (
    <Grid container spacing={3}>
      {Object.keys(formattedPermissions).map((moduleName, index) => (
        <Grid item xs={12} md={6} lg={4} key={moduleName}>
          <PermissionCard
            moduleName={moduleName}
            data={formattedPermissions[moduleName]}
            setFormattedPermissions={setFormattedPermissions}
            handlePermissionChange={handlePermissionChange}
            handleAdminTypeToggle={handleAdminTypeToggle}
            index={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PermissionGrid;
