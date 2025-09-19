import { Grid } from "@mui/material";
import PermissionCard from "../../ViewRolesPermissions/PermissionCard";

const PermissionGrid = ({
  formattedPermissions,
  setFormattedPermissions,
  handlePermissionChange,
  handleAdminTypeToggle,
}) => {
  return (
    <Grid container spacing={3}>
      {Object.entries(formattedPermissions).map(([adminTypeId, data], index) => (
        <Grid item xs={12} md={6} lg={4} key={adminTypeId}>
          <PermissionCard
            adminTypeId={adminTypeId}
            data={data}
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
