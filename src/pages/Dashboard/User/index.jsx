import { Box, Card, CardContent } from "@mui/material";
import UserBalanceCard from "./UserBalanceCard";
import UserSummaryCard from "./UserSummaryCard";
import GenericCard from "./GenericCard";
import UserIdentifyCard from "./UserIdentifyCard";
import UserActionCard from "./UserActionCard";
import { cardStyle } from "./userStyles";

export default function User() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          sx={{
            ...cardStyle,
            width: "100%",
            maxWidth: "1000px",
            marginBottom: 2,
          }}
        >
          <CardContent sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
            {index === 0 ? (
              <UserSummaryCard />
            ) : index === 1 ? (
              <UserBalanceCard />
            ) : index === 2 ? (
              <GenericCard />
            ) : index === 3 ? (
              <UserIdentifyCard />
            ) : (
              <UserActionCard />
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
