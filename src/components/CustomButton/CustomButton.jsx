import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CustomButton = ({
  type = "edit",
  onClick,
  color = "#208BC9",
  text = "Edit",
  iconColor = "white",
  icon = true,
}) => {
  const buttonStyles = {
    width: type === "add" ? "119px" : "83px",
    height: type === "add" ? "40px" : type === "green" ? "25px" : "32px",
    borderRadius: type === "green" ? "20px" : "10px",
    backgroundColor: type === "green" ? "#B4FBBD" : color,
    border: type === "green" ? "1px solid #009512" : "none",
    fontFamily: type === "green" ? '"Raleway", sans-serif' : '"Inter", sans-serif',
    fontWeight: type === "green" ? 500 : type === "add" ? 800 : 700,
    fontSize: type === "green" ? "12px" : type === "add" ? "22px" : "10px",
    lineHeight: type === "green" ? "16px" : type === "add" ? "54px" : "100%",
    letterSpacing: type === "green" ? "0.3%" : "normal",
    textAlign: "center",
    textTransform: "capitalize",
    color: type === "green" ? "#009512" : "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    "&:hover": {
      backgroundColor: type === "green" ? "#B4FBBD" : color,
    },
  };



  const renderIcon = () => {
    if (type === "add" && icon) {
      return <AddIcon sx={{ color: iconColor }} />;
    }
    return null;
  };

  const renderText = () => {
    if (type === "edit") {
      return "Edit";
    } else if (type === "disable") {
      return "Disable";
    } else if (type === "green") {
      return "Enabled";
    } else if (type === "add") {
      return text;
    }
    return null;
  };

  return (
    <Button onClick={onClick} sx={buttonStyles}>
      {renderText()} {renderIcon()}
    </Button>
  );
};

export default CustomButton;
