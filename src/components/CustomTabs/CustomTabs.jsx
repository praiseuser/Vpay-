import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

const CustomTabs = ({ tabLabels, value, onChange }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1075px",
        borderRadius: "22px",
        border: "1px solid #D9D9D9",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "12px", sm: "16px" },
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "42px",
          borderRadius: "14px",
          backgroundColor: "#EBF1F4",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Tabs
          value={value}
          onChange={onChange}
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            padding: 0,
            minHeight: "0",
            gap: "12px",
            "& .MuiTab-root": {
              minWidth: "auto",
              minHeight: "0",
              padding: "6px 14px",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
              borderRadius: "8px",
            },
            "& .Mui-selected": {
              backgroundColor: "white",
              padding: "6px 14px",
              margin: "8px 0",
              borderRadius: "8px",
              border: 1,
              borderColor: "#EAEAEA",
            },
          }}
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              label={
                <Typography
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "13px" },
                    lineHeight: "20px",
                    textAlign: "center",
                    color: value === index ? "#000000" : "#73757C",
                  }}
                >
                  {label}
                </Typography>
              }
              sx={{
                textTransform: "none",
                justifyContent: "center",
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default CustomTabs;
