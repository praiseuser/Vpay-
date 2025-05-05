// import React from "react";
// import { Card, Box, Typography } from "@mui/material";

// const withdrawals = [
//   { name: "Jenny Wilson", amount: "+$265.00", color: "#02042D" },
//   { name: "Darlene Robertson", amount: "+$365.22", color: "#02042D" },
//   { name: "William", amount: "+$125.14", color: "#377DFF" },
//   { name: "Guy Hawkins", amount: "+$254.00", color: "#02042D" },
//   { name: "Grace Jim", amount: "+$412.00", color: "#377DFF" },
//   { name: "Jane Cooper", amount: "+$127.00", color: "#02042D" },
// ];

// const WithdrawCard = ({ cardShadow }) => (
//   <Card
//     sx={{
//       borderRadius: "16px", // Original
//       p: { xs: 0.5, sm: 2 }, // Original
//       boxShadow: cardShadow, // Passed from parent
//       backgroundColor: "#fff", // Original
//     }}
//   >
//     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//       <Typography fontWeight={600} fontSize={16} color="#0C0B18">
//         Withdraw
//       </Typography>
//       <Typography fontSize={16} color="#646464" sx={{ cursor: "pointer" }}>
//         View All
//       </Typography>
//     </Box>

//     {withdrawals.map((item, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//         <Box
//           sx={{
//             width: 56, // Original fixed width
//             height: 56, // Original fixed height
//             borderRadius: "10px",
//             backgroundColor: "#D9D9D9",
//             mr: 2, // Original margin-right
//           }}
//         />
//         <Box flexGrow={1}>
//           <Typography fontSize={14} fontWeight={600}>
//             {item.name}
//           </Typography>
//           <Typography fontSize={12} color="#646464" mt={1}>
//             12/03/2024
//           </Typography>
//         </Box>
//         <Typography fontSize={14} fontWeight={600} color={item.color}>
//           {item.amount}
//         </Typography>
//       </Box>
//     ))}
//   </Card>
// );

// export default WithdrawCard;