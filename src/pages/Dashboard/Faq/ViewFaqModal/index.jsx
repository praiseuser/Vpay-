import React from "react";
import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ViewFaqModal = ({ open, onClose, faq }) => {
    if (!faq) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 3,
                    backgroundColor: "#fff",
                    boxShadow: 10,
                },
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.15)",
                            transform: "rotate(90deg) scale(1.1)",
                        },
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    }}
                >
                    <CloseIcon sx={{ color: "text.primary", fontSize: 20 }} />
                </IconButton>
            </Box>
            <DialogContent
                sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        mb: 1,
                    }}
                >
                    {faq.question}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        color: "text.secondary",
                    }}
                >
                    {faq.answer || "No answer available."}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ViewFaqModal;
