import React from "react";
import { Box, Skeleton, Chip } from "@mui/material";
import {
  container,
  gridWrapper,
  labelText,
  valueText,
  textTitle,
} from "./styles";

const PersonalDetailsCard = ({ userData, loading }) => {
  const fields = [
    { label: "Username", value: userData?.username },
    {
      label: "Full Name",
      value: `${userData?.firstname || "-"} ${userData?.lastname || "-"}`,
    },
    { label: "Email", value: userData?.email },
    { label: "Email Verified", value: userData?.email_verified ? "Yes" : "No" },
    { label: "Phone", value: userData?.phone },
    { label: "Country", value: userData?.country },
    { label: "Gender", value: userData?.gender },
    { label: "Network", value: userData?.network },
  ];

  return (
    <Box sx={container}>
      <Box sx={textTitle}>PERSONAL INFO</Box>

      <Box sx={gridWrapper}>
        {fields.map((field, idx) => (
          <Box key={idx}>
            <Box sx={labelText}>{field.label}</Box>

            <Box sx={valueText}>
              {loading ? (
                <Skeleton variant="text" width={140} />
              ) : field.value ? (
                field.value
              ) : (
                "Not Provided"
              )}
            </Box>
          </Box>
        ))}

        <Box>
          <Box sx={labelText}>Status</Box>
          <Box sx={valueText}>
            {loading ? (
              <Skeleton variant="rounded" width={60} height={28} />
            ) : (
              <Chip
                label={userData?.status === 1 ? "Active" : "Inactive"}
                variant="outlined"
                color={userData?.status === 1 ? "success" : "error"}
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalDetailsCard;
