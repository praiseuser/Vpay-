import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const glowShift = keyframes`
  0% { background-color: #FF6B6B; box-shadow: 0 0 25px #FF6B6B; }
  25% { background-color: #6BCB77; box-shadow: 0 0 25px #6BCB77; }
  50% { background-color: #4D96FF; box-shadow: 0 0 25px #4D96FF; }
  75% { background-color: #FFD93D; box-shadow: 0 0 25px #FFD93D; }
  100% { background-color: #FF6B6B; box-shadow: 0 0 25px #FF6B6B; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
`;

const generateStars = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    duration: `${Math.random() * 2 + 1.5}s`,
    delay: `${Math.random() * 2}s`,
  }));

const stars = generateStars(40);

export default function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#02042D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            opacity: 0.2,
            animation: `${twinkle} ${star.duration} ease-in-out ${star.delay} infinite`,
            zIndex: 0,
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "100%",
          width: "50%",
          background: "linear-gradient(-45deg, #FF6B6B, #6BCB77, #4D96FF, #FFD93D)",
          backgroundSize: "400% 400%",
          animation: `${gradientShift} 12s ease infinite`,
          zIndex: 1,
          opacity: 0.25,
        }}
      />

      <Box
        component="img"
        src="/image 5.png"
        alt="Dashboard Background"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "85%",
          objectFit: "contain",
          opacity: 0.3,
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 30,
          height: 30,
          borderRadius: "50%",
          animation: `${bounce} 1.2s infinite, ${glowShift} 4s infinite`,
          zIndex: 3,
        }}
      />

      <Box
        sx={{
          zIndex: 4,
          textAlign: "center",
          color: "#fff",
          animation: `${fadeIn} 1.2s ease-out`,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: "#B0B3FF" }}>
          Manage. Monitor. Master.
        </Typography>
      </Box>
    </Box>
  );
}
