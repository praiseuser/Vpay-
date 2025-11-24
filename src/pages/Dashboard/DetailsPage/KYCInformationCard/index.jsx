import React from "react";
import { Box, Button, Skeleton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  cardContainer,
  cardTitle,
  kycCardBox,
  statusBox,
  statusText,
  fieldLabel,
  fieldValue,
  btnGroup,
} from "./styles";

const KYCInformationCard = ({ userData, loading }) => {
  const getStatusIcon = (status) => {
    if (status === "Approved")
      return <CheckCircleIcon sx={{ fontSize: 18, color: "white", mr: 0.5 }} />;
    if (status === "Pending")
      return (
        <HourglassEmptyIcon sx={{ fontSize: 18, color: "white", mr: 0.5 }} />
      );
    return <CancelIcon sx={{ fontSize: 18, color: "white", mr: 0.5 }} />;
  };

  const kycItems = [
    {
      title: "Personal Identity Verification",
      status: userData?.kyc_identity_verification_status || "Pending",
      fields: userData?.kyc_identity_verification_data || null,
    },
    {
      title: "Address Verification",
      status: userData?.kyc_address_verification_status || "Pending",
      fields: userData?.kyc_address_verification_data || null,
    },
  ];

  return (
    <Box sx={cardContainer}>
      <Box sx={cardTitle}>KYC INFORMATION</Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 4,
        }}
      >
        {kycItems.map((item, index) => {
          const hasData = item.fields && Object.keys(item.fields).length > 0;

          return (
            <Box key={index} sx={kycCardBox}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    ...statusBox,
                    display: "flex",
                    alignItems: "center",
                    bgcolor: loading
                      ? "#e0e0e0"
                      : item.status === "Approved"
                      ? "#16A34A"
                      : item.status === "Pending"
                      ? "#F59E0B"
                      : "#DC2626",
                  }}
                >
                  {loading ? (
                    <Skeleton width={60} />
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {getStatusIcon(item.status)}
                      <Box sx={statusText}>{item.status}</Box>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#17181A",
                  }}
                >
                  {loading ? <Skeleton width={150} /> : item.title}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="text"
                      width="80%"
                      sx={{ mb: 1.5 }}
                    />
                  ))
                ) : hasData ? (
                  Object.entries(item.fields).map(([label, value], i) => (
                    <Box key={i} sx={{ mb: 1.5 }}>
                      <Box sx={fieldLabel}>{label}</Box>
                      <Box sx={fieldValue}>{value || "Not Provided"}</Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={fieldValue}>No data submitted</Box>
                )}
              </Box>

              {!loading && (
                <Box sx={btnGroup}>
                  <Button
                    variant="contained"
                    disabled={!hasData}
                    sx={{
                      textTransform: "none",
                      bgcolor: !hasData ? "#9CA3AF" : "#16A34A",
                      "&:hover": {
                        bgcolor: !hasData ? "#9CA3AF" : "#15803D",
                      },
                    }}
                  >
                    {hasData ? "Approve" : "Awaiting Submission"}
                  </Button>

                  <Button
                    variant="outlined"
                    disabled={!hasData}
                    sx={{
                      textTransform: "none",
                      borderColor: !hasData ? "#9CA3AF" : "#DC2626",
                      color: !hasData ? "#9CA3AF" : "#DC2626",
                      "&:hover": {
                        borderColor: !hasData ? "#9CA3AF" : "#B91C1C",
                        color: !hasData ? "#9CA3AF" : "#B91C1C",
                      },
                    }}
                  >
                    {hasData ? "Decline" : "No Data"}
                  </Button>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default KYCInformationCard;
