import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchUserById } from "../../../Hooks/useUsers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomLoader from "../../../components/CustomLoader";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useFetchUserById(id);

  const pageTitle = "User Details";

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CustomLoader />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );

  if (!user)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>No user found</Typography>
      </Box>
    );

  return (
    <Box sx={{ width: "100%", p: 3, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          textAlign: "center",
          color: "#222",
          fontSize: "26px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {pageTitle}
      </Typography>

      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            sx={{ width: 90, height: 90, bgcolor: "#1976d2", fontSize: 28 }}
            src={user.avatar || ""}
          >
            {user.firstname?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                fontSize: "19px",
              }}
            >
              {user.firstname} {user.lastname}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "17px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
              }}
            >
              {user.email}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={user.role === "1" ? "Admin" : "User"}
                color={user.role === "1" ? "primary" : "default"}
                size="small"
                sx={{
                  fontSize: "14px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                }}
              />
              <Chip
                label={user.status === 1 ? "Active" : "Inactive"}
                color={user.status === 1 ? "success" : "error"}
                size="small"
                sx={{
                  fontSize: "14px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                }}
              />
            </Stack>
          </Box>
        </CardContent>
      </Card>


      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: "22px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Personal Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Firstname:</b> {user.firstname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Lastname:</b> {user.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Phone:</b> {user.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Gender:</b> {user.gender}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Country:</b> {user.country}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: "22px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Account Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Username:</b> {user.username}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Role:</b> {user.role}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Created At:</b> {user.created_at || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Updated At:</b> {user.updated_at || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: "22px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            KYC Info
          </Typography>
          <Grid container spacing={2}>
            {/* Identity */}
            <Grid item xs={12} md={4}>
              <Chip
                label={`Identity: ${user.kyc_identity_status || "Pending"}`}
                color={user.kyc_identity_status === "approved" ? "success" : "warning"}
              />
              {user.kyc_identity_details && (
                <Box mt={1}>
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                  >
                    <b>Type:</b> {user.kyc_identity_details.type}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                  >
                    <b>Number:</b> {user.kyc_identity_details.number}
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* Address */}
            <Grid item xs={12} md={4}>
              <Chip
                label={`Address: ${user.kyc_address_status || "Pending"}`}
                color={user.kyc_address_status === "approved" ? "success" : "warning"}
              />
              {user.kyc_address_details && (
                <Box mt={1}>
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                  >
                    <b>Street:</b> {user.kyc_address_details.street}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                  >
                    <b>City:</b> {user.kyc_address_details.city}
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* Business */}
            <Grid item xs={12} md={4}>
              <Chip
                label={`Business: ${user.kyc_business_status || "Pending"}`}
                color={user.kyc_business_status === "approved" ? "success" : "warning"}
              />
              {user.kyc_business_details && (
                <Box mt={1}>
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                  >
                    <b>Company:</b> {user.kyc_business_details.company}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                  >
                    <b>Reg No:</b> {user.kyc_business_details.reg_number}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" color="success">
              Approve KYC
            </Button>
            <Button variant="outlined" color="error">
              Decline KYC
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: "22px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Security Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Email Verified:</b> {user.email_verified ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>2FA Enabled:</b> {user.authenticator_enabled ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Last Login:</b> {user.last_login || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "17px", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                <b>Login Attempts:</b> {user.login_attempts}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard/user")}
          sx={{
            fontSize: "17px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          Go Back
        </Button>
      </Box>

    </Box>
  );
}
