import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useFetchUserById } from "../../../Hooks/useUsers";

// Recursive renderer for nested objects/arrays
function renderValue(value) {
  if (Array.isArray(value)) {
    return (
      <Box sx={{ pl: 2, mt: 1 }}>
        {value.map((item, idx) => (
          <Card key={idx} sx={{ mb: 1, p: 1, backgroundColor: "#f9f9f9" }}>
            {typeof item === "object" ? renderValue(item) : item.toString()}
          </Card>
        ))}
      </Box>
    );
  } else if (typeof value === "object" && value !== null) {
    return (
      <Box sx={{ pl: 2 }}>
        {Object.entries(value).map(([k, v], idx) => (
          <Box key={idx} sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 600, color: "#555", mb: 0.5 }}>{k.toUpperCase()}</Typography>
            <Box sx={{ pl: 2 }}>
              {typeof v === "object" ? renderValue(v) : <Typography>{v !== null ? v.toString() : "N/A"}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>
    );
  } else {
    return <Typography>{value !== null ? value.toString() : "N/A"}</Typography>;
  }
}

export default function DetailsPage({ id }) {
  const { user, loading, error } = useFetchUserById(id);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography color="error">{error}</Typography>
    </Box>
  );

  if (!user) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>No user found</Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, gap: 2 }}>
      {Object.entries(user).map(([section, value]) => (
        <Card key={section} sx={{ width: "100%", maxWidth: 1000, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography sx={{ fontWeight: 700, mb: 2, fontSize: "18px", color: "#333" }}>
              {section.toUpperCase()}
            </Typography>
            {renderValue(value)}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
