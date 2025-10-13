import React from "react";
import { Box, Button, TextField, Typography, MenuItem, Paper } from "@mui/material";

const AddForm = ({
    title = "Add Form",
    fields = [],
    onSubmit,
    buttonText = "Submit",
}) => {
    const [formData, setFormData] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    return (
        <Box sx={{ width: "100%", px: 2, mt: 6 }}>
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    p: 6,
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        color: "#0a2540",
                        textAlign: "left",
                        fontSize: 18,
                    }}
                >
                    {title}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "grid",
                        gap: 4,
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    }}
                >
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            select={field.type === "select"}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            placeholder={field.placeholder || ""}
                            fullWidth
                            required={field.required}
                            helperText={field.helperText || ""}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 40,
                                    borderRadius: 3,
                                    transition: "all 0.3s ease",
                                    "&:hover fieldset": { borderColor: "#0056d1" },
                                    "&.Mui-focused fieldset": { borderColor: "#007bff", borderWidth: 2 },
                                },
                                "& .MuiInputLabel-root": { fontWeight: 500 },
                                "& .MuiFormHelperText-root": { color: "#6b6b6b", fontSize: 13 },
                            }}
                        >
                            {field.type === "select" &&
                                field.options?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                    ))}

                    <Box sx={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: "50%",
                                py: 0.8,
                                borderRadius: 3,
                                fontWeight: 600,
                                fontSize: 15,
                                backgroundColor: "#02042D",
                                color: "#fff",
                                transition: "all 0.3s ease",
                                ":hover": {
                                    backgroundColor: "#04072e",
                                    transform: "scale(1.02)",
                                },
                            }}
                        >
                            {buttonText.toUpperCase()}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddForm;
