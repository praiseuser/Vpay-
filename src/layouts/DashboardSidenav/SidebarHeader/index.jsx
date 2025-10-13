import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styles } from "../styles";

export default function SidebarHeader({ collapsed, onToggle }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      {!collapsed && (
        <Box sx={{ ml: 1 }}>
          <img
            src="/Vpaylogo.png"
            alt="Logo"
            style={{ width: 80, height: 30 }}
          />
        </Box>
      )}
      <IconButton onClick={onToggle} sx={styles.toggleButton}>
        <ChevronLeftIcon />
      </IconButton>
    </Box>
  );
}
