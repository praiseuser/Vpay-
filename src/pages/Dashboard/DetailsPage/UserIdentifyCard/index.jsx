import { Box, Typography } from "@mui/material";

export default function UserIdentifyCard({ user }) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding="16px">
            <Box display="flex" justifyContent="space-between" width="100%" marginTop="8px">
                <Typography sx={titleStyle}>Identity Verification</Typography>
            </Box>

            <Box sx={cardContainerStyle}>
                <Box display="flex" justifyContent="space-between">
                    <InfoColumn label="DOCUMENT TYPE" value={user.document_type} />
                    <InfoColumn label="DOCUMENT NUMBER" value={user.document_number} />
                    <InfoColumn label="ISSUING COUNTRY" value={user.document_country} />
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <InfoColumn label="EXPIRY DATE" value={user.document_expiry} />
                    <InfoColumn label="DATE OF BIRTH" value={user.dob} />
                    <InfoColumn label="SUBMITTED DOCUMENT" value={user.document_file} />
                </Box>
            </Box>
        </Box>
    );
}

const InfoColumn = ({ label, value }) => (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography sx={labelStyle}>{label}</Typography>
        <Typography sx={valueStyle}>{value || "N/A"}</Typography>
    </Box>
);

const titleStyle = { fontFamily: "Inter", fontWeight: 600, fontSize: 18 };
const cardContainerStyle = { width: "970px", borderRadius: 24, border: "2px solid #EBF1F4", marginTop: 16, padding: "24px 100px 24px 50px", display: "flex", flexDirection: "column", gap: 32 };
const labelStyle = { fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: "#BDC1D0" };
const valueStyle = { fontFamily: "Inter", fontWeight: 400, fontSize: 13, color: "#000", marginTop: 4 };
