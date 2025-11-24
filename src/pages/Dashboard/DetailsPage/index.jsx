import React from "react";
import { Box, Typography, Divider, Skeleton } from "@mui/material";
import FlagCardsCard from "./FlagCardsCard";
import StatsCardsSection from "./StatsCardsSection";
import PersonalDetailsCard from "./PersonalDetailsCard";
import KYCInformationCard from "./KYCInformationCard";
import VirtualCardsCard from "./VirtualCardsCard";
import FiatCard from "./FiatCard";
import CryptoCard from "./CryptoCard";
import TransactionHistoryCard from "./TransactionHistoryCard";
import ActivityLogsCard from "./ActivityLogsCard";
import { useGetUserById } from "../../../Hooks/useUsers";

const DetailsPage = ({
  userId,
  onViewAllTransactions,
  onViewAllExpenses,
  onViewAllCrypto,
  onViewAllFiat,
  onViewAllReceived,
  onViewAllWithdrawn,
  onViewAllFiatReceived,
  onViewAllFiatWithdrawn,
}) => {
  const { userData, loading } = useGetUserById(userId);

  const fullName =
    userData?.firstname && userData?.lastname
      ? `${userData.firstname} ${userData.lastname}`
      : "User";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 3,
        borderRadius: "10px",
      }}
    >
      <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#0F172A",
              letterSpacing: "0.3px",
            }}
          >
            {loading ? <Skeleton width={150} /> : fullName}
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                fontSize: "18px",
                color: "#64748B",
                ml: 1,
              }}
            >
              – Overview
            </Typography>
          </Typography>

          <Divider sx={{ mt: 1.5, borderColor: "#E2E8F0", width: "100%" }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          <FlagCardsCard />

          <StatsCardsSection
            userId={userId}
            onViewAllReceived={onViewAllReceived}
            onViewAllWithdrawn={onViewAllWithdrawn}
            onViewAllFiatReceived={onViewAllFiatReceived}
            onViewAllFiatWithdrawn={onViewAllFiatWithdrawn}
          />

          <PersonalDetailsCard userData={userData} loading={loading} />

          <FiatCard userId={userId} onViewAll={onViewAllFiat} />

          <CryptoCard userId={userId} />

          <KYCInformationCard userData={userData} loading={loading} />

          <VirtualCardsCard userData={userData} loading={loading} />

          <TransactionHistoryCard
            userId={userId}
            onViewAllTransactions={onViewAllTransactions}
          />

          <ActivityLogsCard userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsPage;
