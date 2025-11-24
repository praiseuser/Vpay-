import React from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import {
  container,
  cardsWrapper,
  blueCard,
  titleStyle,
  titleText,
  amountText,
  blueButton,
} from "./styles";
import { useGetUserAssets } from "../../../../Hooks/useUsers";

const CryptoCard = ({ userId }) => {
  const { userAssets, loading } = useGetUserAssets(userId, "testnet");

  const handleViewAll = (asset) => {
    console.log("View all clicked for", asset);
  };

  const cryptoList = userAssets.crypto || [];

  return (
    <Box sx={container}>
      <Box sx={titleStyle}>Crypto Assets</Box>
      <Box sx={cardsWrapper}>
        {loading ? (
          Array(3)
            .fill({})
            .map((_, index) => (
              <Box key={index} sx={blueCard}>
                <Box>
                  <Box sx={titleText}>
                    <Skeleton width={100} />
                  </Box>
                  <Box sx={amountText}>
                    <Skeleton width={60} />
                  </Box>
                </Box>
                <Button sx={blueButton}>
                  <Skeleton width={60} />
                </Button>
              </Box>
            ))
        ) : cryptoList.length > 0 ? (
          cryptoList.map((asset, index) => (
            <Box key={index} sx={blueCard}>
              <Box>
                <Box sx={titleText}>
                  {asset.token_name} ({asset.token_symbol})
                </Box>
                <Box sx={amountText}>${Number(asset.balance).toFixed(4)}</Box>
              </Box>
              <Button sx={blueButton} onClick={() => handleViewAll(asset)}>
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
              No crypto assets found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CryptoCard;
