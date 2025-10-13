import { Box, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { styles } from "../styles";

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
  return (
    <>
      {navItems.map((item, i) => {
        const active = isActive(item.path);
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
              <Box
                onClick={() => onClick(item.path)}
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
                  <span style={{ ...styles.navText, marginLeft: 8 }}>
                    {item.label}
                  </span>
                )}
              </Box>
            </motion.div>
          </Tooltip>
        );
      })}
    </>
  );
}
