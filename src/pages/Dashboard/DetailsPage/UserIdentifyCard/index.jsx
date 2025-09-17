import { Box, Typography, Button } from "@mui/material";

export default function GenericCard() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding="16px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                marginTop="8px"
            >
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: "20px",
                        letterSpacing: "0px",
                        color: "#000000",
                    }}
                >
                    Identity Verification
                </Typography>

                <Button
                    sx={{
                        width: "70px",
                        height: "24px",
                        borderRadius: "16px",
                        backgroundColor: "rgba(0, 149, 18, 0.2)",
                        padding: 0,
                        minWidth: 0,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: 500,
                            fontSize: "10px",
                            lineHeight: "100%",
                            letterSpacing: "0px",
                            color: "#009512",
                        }}
                    >
                        Verified
                    </Typography>
                </Button>
            </Box>

            <Box
                sx={{
                    width: "970px",
                    borderRadius: "24px",
                    border: "2px solid #EBF1F4",
                    marginTop: "16px",
                    padding: "24px 100px 24px 50px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                }}
            >
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography sx={labelStyle}>DOCUMENT TYPE</Typography>
                        <Typography sx={valueStyle}>Passport</Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography sx={labelStyle}>DOCUMENT NUMBER</Typography>
                        <Typography sx={valueStyle}>ASD13456I8</Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography sx={labelStyle}>ISSUING COUNTRY</Typography>
                        <Typography sx={valueStyle}>Nigeria</Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography sx={labelStyle}>EXPIRY DATE</Typography>
                        <Typography sx={valueStyle}>29 Nov, 2027</Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography sx={labelStyle}>DATE OF BIRTH</Typography>
                        <Typography sx={valueStyle}>01 Jan, 1990</Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography sx={{ ...labelStyle, }}>
                            SUBMITTED DOCUMENT
                        </Typography>

                        <Typography sx={{ ...valueStyle, color: "#28C3FF" }}>
                            View Passport
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}

const labelStyle = {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "9px",
    letterSpacing: "2px",
    color: "#BDC1D0",
};

const valueStyle = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "16px",
    letterSpacing: "0px",
    color: "#000000",
    marginTop: "4px",
};
