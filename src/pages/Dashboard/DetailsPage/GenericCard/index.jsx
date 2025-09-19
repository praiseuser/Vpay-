export default function GenericCard({ user }) {
    return (
        <Box>
            <Typography>Address Information</Typography>
            <Box display="flex" gap={4} mt={2}>
                <Box>
                    <Typography>COUNTRY</Typography>
                    <Typography>{user.country || "N/A"}</Typography>
                </Box>

                <Box>
                    <Typography>STATE</Typography>
                    <Typography>{user.state || "N/A"}</Typography>
                </Box>

                <Box>
                    <Typography>CITY</Typography>
                    <Typography>{user.city || "N/A"}</Typography>
                </Box>
            </Box>
        </Box>
    );
}
