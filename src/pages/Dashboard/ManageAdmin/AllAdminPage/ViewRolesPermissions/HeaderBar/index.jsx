import { Typography, Divider } from "@mui/material";

const HeaderBar = ({ title }) => (
  <>
    <Typography
      mb={1}
      sx={{
        fontFamily: "Inter, sans-serif",
        fontSize: 20,
        fontWeight: 600,
        color: "#1a202c",
      }}
    >
      {title}
    </Typography>
    <Divider sx={{ mb: 3 }} />
  </>
);

export default HeaderBar;
