// import React from "react";
// import { Card, Box, Typography } from "@mui/material";
// import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

// const pieData = [
//   { name: "Staked", value: 400, fill: "#377DFF" },
//   { name: "Remaining", value: 300, fill: "#E7854D" },
//   { name: "Unstaked", value: 300, fill: "#D9D9D9" },
// ];

// const DepositCard = ({ cardShadow }) => (
//   <Card
//     sx={{
//       width: "100%",
//       borderRadius: "16px",
//       boxShadow: cardShadow,
//       p: { xs: 1, sm: 2, md: 3 },
//       mt: 2,
//       backgroundColor: "#fff",
//     }}
//   >
//     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//       <Typography fontWeight={600} fontSize={{ xs: 18, sm: 22 }} color="#0C0B18">
//         Deposit
//       </Typography>
//       <Typography fontSize={{ xs: 14, sm: 16 }} color="#646464" sx={{ cursor: "pointer" }}>
//         View All
//       </Typography>
//     </Box>

//     <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
//       <ResponsiveContainer width="100%" height={{ xs: 150, sm: 180 }}>
//         <PieChart>
//           <Pie
//             data={pieData}
//             dataKey="value"
//             cx="50%"
//             cy="50%"
//             outerRadius={{ xs: 50, sm: 70 }}
//             innerRadius={{ xs: 30, sm: 50 }}
//           >
//             {pieData.map((entry, index) => (
//               <Cell key={index} fill={entry.fill} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//       <Box sx={{ position: "absolute", top: "50%", transform: "translateY(-30%)", textAlign: "center" }}>
//         <Typography sx={{ fontSize: { xs: 12, sm: 14 }, color: "#717171" }}>Staked</Typography>
//         <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 700, color: "#1A1A1A" }}>
//           $1,000,000
//         </Typography>
//       </Box>
//     </Box>

//     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//         <KeyboardBackspaceIcon sx={{ fontSize: { xs: 12, sm: 16 } }} />
//         <Typography sx={{ fontSize: { xs: 12, sm: 14 }, color: "#646464" }}>Jul</Typography>
//       </Box>
//       <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600 }}>August</Typography>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//         <Typography sx={{ fontSize: { xs: 12, sm: 14 }, color: "#646464" }}>Sep</Typography>
//         <ArrowRightAltIcon sx={{ fontSize: { xs: 12, sm: 16 } }} />
//       </Box>
//     </Box>
//   </Card>
// );

// export default DepositCard;