// import React from "react";
// import { Card, Typography, Box } from "@mui/material";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
// } from "recharts";

// const barData = [
//   { name: "Jan", primary: 8000, secondary: 900 },
//   { name: "Feb", primary: 5500, secondary: 1700 },
//   { name: "Mar", primary: 4900, secondary: 1000 },
//   { name: "Apr", primary: 7000, secondary: 2000 },
//   { name: "May", primary: 2600, secondary: 1000 },
//   { name: "Jun", primary: 4900, secondary: 1100 },
//   { name: "Jul", primary: 8000, secondary: 900 },
//   { name: "Aug", primary: 7000, secondary: 2800 },
// ];

// const PerformanceCard = ({ cardShadow }) => (
//   <Card
//     sx={{
//       mt: 2,
//       height: 540, // Fixed height as in original
//       width: "100%", // Original width
//       borderRadius: "16px",
//       boxShadow: cardShadow,
//       p: { xs: 1, sm: 3 }, // Responsive padding from original
//       backgroundColor: "#fff",
//     }}
//   >
//     <Typography
//       sx={{
//         fontWeight: 600,
//         fontSize: 22,
//         color: "#0C0B18",
//         fontFamily: "Mada, sans-serif",
//         mb: 2,
//       }}
//     >
//       Performance
//     </Typography>

//     {/* First Bar Chart (Single Bar) */}
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart
//         data={barData}
//         margin={{ top: 20, right: 30, left: -28, bottom: 50 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="name"
//           tick={{ fontFamily: "Mada", fontSize: 14, fill: "#646464" }}
//         />
//         <YAxis
//           tickFormatter={(value) => `${value / 1000}k`}
//           domain={[0, 10000]}
//           tick={{ fontFamily: "Mada", fontSize: 14, fill: "#646464" }}
//         />
//         <Bar dataKey="primary" fill="#377DFF" barSize={25} />
//       </BarChart>
//     </ResponsiveContainer>

//     {/* Crypto Details */}
//     <Box sx={{ marginTop: "-5px", display: "flex", justifyContent: "space-around" }}>
//       <Box>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               backgroundColor: "#E7854D",
//               opacity: 0.2,
//               borderRadius: "50%",
//               mr: 2,
//             }}
//           />
//           <Box>
//             <Typography
//               sx={{
//                 fontWeight: "500",
//                 fontSize: "14px",
//                 lineHeight: "20px",
//                 color: "#0C0B18",
//                 fontFamily: "Mada sans-serif",
//               }}
//             >
//               Bitcoin
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "Mada sans-serif",
//                 fontWeight: "400",
//                 fontSize: "14px",
//                 lineHeight: "16px",
//                 color: "#646464",
//                 mt: 0.4,
//               }}
//             >
//               $43,489.57
//             </Typography>
//           </Box>
//           <Typography
//             sx={{
//               color: "#377DFF",
//               fontSize: 12,
//               fontWeight: 400,
//               lineHeight: "16px",
//               fontFamily: "Mada sans-serif",
//               ml: 2,
//               mt: 2.5,
//             }}
//           >
//             -0.04%
//           </Typography>
//           <Typography
//             sx={{
//               color: "#646464",
//               fontFamily: "Mada sans-serif",
//               fontWeight: 400,
//               fontSize: 14,
//               lineHeight: "20px",
//               ml: 12,
//             }}
//           >
//             0.3 BTC
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               backgroundColor: "#E7854D",
//               opacity: 0.2,
//               mr: 2,
//             }}
//           />
//           <Box>
//             <Typography
//               sx={{
//                 fontFamily: "Mada sans-serif",
//                 fontWeight: "500",
//                 fontSize: "14px",
//                 lineHeight: "20px",
//                 color: "#1A1A1A",
//               }}
//             >
//               BNB
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "Mada sans-serif",
//                 fontWeight: "400",
//                 fontSize: "12px",
//                 lineHeight: "16px",
//                 color: "#717171",
//                 mt: 0.4,
//               }}
//             >
//               $430.11
//             </Typography>
//           </Box>
//           <Typography
//             sx={{
//               color: "#377DFF",
//               fontSize: 12,
//               fontWeight: 400,
//               lineHeight: "16px",
//               fontFamily: "Mada sans-serif",
//               ml: 2,
//               mt: 2.5,
//             }}
//           >
//             -2.44%
//           </Typography>
//           <Typography
//             sx={{
//               color: "#646464",
//               fontFamily: "Mada sans-serif",
//               fontWeight: 400,
//               fontSize: 14,
//               lineHeight: "20px",
//               ml: 15,
//             }}
//           >
//             0 BNB
//           </Typography>
//         </Box>
//       </Box>

//       <Box sx={{ ml: 8 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               backgroundColor: "#E7854D",
//               opacity: 0.2,
//               borderRadius: "50%",
//               mr: 2,
//             }}
//           />
//           <Box>
//             <Typography
//               sx={{
//                 fontWeight: "500",
//                 fontSize: "14px",
//                 lineHeight: "20px",
//                 color: "#0C0B18",
//                 fontFamily: "Mada sans-serif",
//               }}
//             >
//               Smart Chain
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "Mada sans-serif",
//                 fontWeight: "400",
//                 fontSize: "12px",
//                 lineHeight: "16px",
//                 color: "#717171",
//                 mt: 0.4,
//               }}
//             >
//               $430.11
//             </Typography>
//           </Box>
//           <Typography
//             sx={{
//               color: "#E7854D",
//               fontSize: 12,
//               fontWeight: 400,
//               lineHeight: "16px",
//               fontFamily: "Mada sans-serif",
//               ml: -2.5,
//               mt: 2.7,
//             }}
//           >
//             -2.44%
//           </Typography>
//           <Typography
//             sx={{
//               color: "#646464",
//               fontFamily: "Mada sans-serif",
//               fontWeight: 400,
//               fontSize: 14,
//               lineHeight: "20px",
//               ml: 12,
//             }}
//           >
//             0 BNB
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               backgroundColor: "#E7854D",
//               opacity: 0.2,
//               borderRadius: "50%",
//               mr: 2,
//             }}
//           />
//           <Box>
//             <Typography
//               sx={{
//                 fontWeight: "500",
//                 fontSize: "14px",
//                 lineHeight: "20px",
//                 color: "#0C0B18",
//                 fontFamily: "Mada sans-serif",
//               }}
//             >
//               BUSD
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "Mada sans-serif",
//                 fontWeight: "400",
//                 fontSize: "12px",
//                 lineHeight: "16px",
//                 color: "#717171",
//                 mt: 0.4,
//               }}
//             >
//               $56.43
//             </Typography>
//           </Box>
//           <Typography
//             sx={{
//               color: "#377DFF",
//               fontSize: 12,
//               fontWeight: 400,
//               lineHeight: "16px",
//               fontFamily: "Mada sans-serif",
//               ml: 1,
//               mt: 2.7,
//             }}
//           >
//             -0.24%
//           </Typography>
//           <Typography
//             sx={{
//               color: "#646464",
//               fontFamily: "Mada sans-serif",
//               fontWeight: 400,
//               fontSize: 14,
//               lineHeight: "20px",
//               ml: 12,
//             }}
//           >
//             0 BUSD
//           </Typography>
//         </Box>
//       </Box>
//     </Box>

//     {/* Second Bar Chart (Stacked) */}
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart
//         data={barData}
//         margin={{ top: 20, right: 30, left: -28, bottom: 50 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="name"
//           tick={{ fontFamily: "Mada", fontSize: 14, fill: "#646464" }}
//         />
//         <YAxis
//           tickFormatter={(value) => `${value / 1000}k`}
//           domain={[0, 10000]}
//           tick={{ fontFamily: "Mada", fontSize: 14, fill: "#646464" }}
//         />
//         <Bar dataKey="primary" stackId="a" fill="#377DFF" barSize={25} />
//         <Bar dataKey="secondary" stackId="a" fill="#D9D9D9" barSize={25} />
//       </BarChart>
//     </ResponsiveContainer>
//   </Card>
// );

// export default PerformanceCard;