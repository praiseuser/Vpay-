import { useState } from "react";
import { Box, Tooltip, Collapse } from "@mui/material";
import { motion } from "framer-motion";
import { styles } from "../styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
};

export default function SidebarNavItems({
  navItems,
  collapsed,
  isActive,
  onClick,
}) {
  const [openItems, setOpenItems] = useState({});

  const toggleOpen = (label) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {navItems.map((item, i) => {
        const active = isActive(item.path);
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const isOpen = openItems[item.label];

        return (
          <Tooltip
            title={collapsed ? item.label : ""}
            placement="right"
            key={item.label}
          >
            <motion.div
              custom={i}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              {/* MAIN ITEM */}
              <Box
                onClick={() =>
                  hasChildren ? toggleOpen(item.label) : onClick(item.path)
                }
                sx={{
                  position: "relative",
                  ...styles.navItem,
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: active
                    ? "rgba(0,255,204,0.1)"
                    : "transparent",
                  color: active ? "#00FFCC" : "#B0B3B8",
                  "&:hover": {
                    background: "rgba(0,255,204,0.15)",
                    color: "#fff",
                  },
                  gap: collapsed ? 0 : 1,
                }}
              >
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "15%",
                      bottom: "15%",
                      width: "3px",
                      borderRadius: "3px",
                      background: "#00FFCC",
                    }}
                  />
                )}

                {item.icon}
                {!collapsed && (
                  <>
                    <span style={{ ...styles.navText, marginLeft: 8 }}>
                      {item.label}
                    </span>
                    {hasChildren && (
                      <Box sx={{ ml: "auto" }}>
                        {isOpen ? (
                          <ExpandLessIcon sx={{ fontSize: 18, color: "#00FFCC" }} />
                        ) : (
                          <ExpandMoreIcon sx={{ fontSize: 18, color: "#B0B3B8" }} />
                        )}
                      </Box>
                    )}
                  </>
                )}
              </Box>

              {/* CHILDREN (Dropdown Items) */}
              {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {item.children.map((child, idx) => {
                    const childActive = isActive(child.path);
                    return (
                      <Box
                        key={child.label}
                        onClick={() => onClick(child.path)}
                        sx={{
                          ...styles.navItem,
                          justifyContent: "flex-start", // ✅ left aligned
                          alignItems: "center",
                          ml: collapsed ? 0 : 4, // ✅ start where parent text starts
                          my: 0.5,
                          py: 0.5,
                          pl: 1,
                          borderRadius: "8px",
                          fontSize: "13px", // ✅ smaller text
                          background: childActive
                            ? "rgba(0,255,204,0.1)"
                            : "transparent",
                          color: childActive ? "#00FFCC" : "#B0B3B8",
                          "&:hover": {
                            background: "rgba(0,255,204,0.15)",
                            color: "#fff",
                          },
                          gap: 1.2,
                        }}
                      >
                        {/* Smaller icon for child */}
                        <Box sx={{ fontSize: "16px", display: "flex", alignItems: "center" }}>
                          {child.icon}
                        </Box>

                        <span
                          style={{
                            ...styles.navText,
                            fontSize: "13px",
                            letterSpacing: "0.3px",
                          }}
                        >
                          {child.label}
                        </span>
                      </Box>
                    );
                  })}
                </Collapse>
              )}
            </motion.div>
          </Tooltip>
        );
      })}
    </>
  );
}
