import { Box, Avatar, Typography } from "@mui/material";

export default function SidebarAvatar({ avatarText, displayName }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
        px: 1,
        py: 2,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: 2,
        mx: 2,
      }}
    >
      <Avatar
        sx={{
          width: 60,
          height: 60,
          mb: 1,
          border: "2px solid #00FFCC",
          bgcolor: "#02042D",
          color: "#00FFCC",
          fontWeight: 600,
          fontSize: 24,
        }}
      >
        {avatarText}
      </Avatar>
      <Typography
        variant="subtitle1"
        color="#fff"
        sx={{ fontWeight: 600, mt: 1 }}
      >
        {displayName}
      </Typography>
    </Box>
  );
}
