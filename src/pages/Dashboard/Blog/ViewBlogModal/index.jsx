import React from "react";
import { Dialog, Box, Typography, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_IMAGE_URL } from "../../../../utilities/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ViewBlogModal = ({ open, onClose, blog }) => {
    if (!blog) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullHeight
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 350 },
                    height: "100vh",
                    m: 0,
                    borderRadius: 0,
                    position: "fixed",
                    right: 0,
                    top: 5,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    backgroundColor: "#f9f9f9",
                },
            }}
            TransitionComponent={Transition}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {blog.title}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 3,
                }}
            >
                {blog.image && (
                    <Box
                        component="img"
                        src={`${BASE_IMAGE_URL}${blog.image}`}
                        alt={blog.title}
                        sx={{
                            width: "100%",
                            maxHeight: 250,
                            objectFit: "cover",
                            borderRadius: 3,
                        }}
                    />
                )}

                <Typography variant="h6" color="text.secondary">
                    Category: {blog.name || "N/A"}
                </Typography>

                <Typography variant="body1" sx={{ fontSize: 16, lineHeight: 1.6 }}>
                    {blog.content || "No content available."}
                </Typography>
            </Box>
        </Dialog>
    );
};

export default ViewBlogModal;
