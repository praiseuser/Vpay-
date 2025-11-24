import React from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";
import {
  container,
  cardsWrapper,
  purpleCard,
  titleStyle,
  titleText,
  amountText,
  purpleButton,
} from "./styles";
import { useGetUserAssets } from "../../../../Hooks/useUsers";

const FiatCard = ({ userId, onViewAll }) => {
  const { userAssets, loading } = useGetUserAssets(userId, "testnet");
  const fiatList = userAssets.fiat || [];

  return (
    <Box sx={container}>
      <Box sx={titleStyle}>Fiat Assets</Box>
      <Box sx={cardsWrapper}>
        {loading ? (
          Array(3)
            .fill({})
            .map((_, index) => (
              <Box key={index} sx={purpleCard}>
                <Box>
                  <Box sx={titleText}>
                    <Skeleton width={100} />
                  </Box>
                  <Box sx={amountText}>
                    <Skeleton width={60} />
                  </Box>
                </Box>
                <Button sx={purpleButton}>
                  <Skeleton width={60} />
                </Button>
              </Box>
            ))
        ) : fiatList.length > 0 ? (
          fiatList.map((asset, index) => (
            <Box key={index} sx={purpleCard}>
              <Box>
                <Box sx={titleText}>
                  {asset.fiat_currency_name} ({asset.currency_code})
                </Box>
                <Box sx={amountText}>
                  {Number(asset.balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Box>
              </Box>
              <Button sx={purpleButton} onClick={() => onViewAll(asset)}>
                View All
              </Button>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "#64748B" }}>
              No fiat assets found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FiatCard;
