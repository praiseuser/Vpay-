import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const AddForm = ({
  title,
  description,
  textFields = [],
  onSubmit,
  onCancel,
  initialValues = {},
  submitText = "Add",
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [previewImages, setPreviewImages] = useState({});

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setPreviewImages((prev) => ({ ...prev, [fieldName]: base64 }));
    setFormValues((prev) => ({ ...prev, [fieldName]: base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.08)",
        p: 4.5,
        mt: 4,
      }}
    >
      {/* Title & Description - Left aligned and close together */}
      {title && (
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 0.5, fontWeight: 700 }}
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, textAlign: "left" }}
        >
          {description}
        </Typography>
      )}

      {/* Form Fields */}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {textFields.map((field, i) => (
            <Grid item xs={12} sm={field.type === "file" ? 12 : 6} key={i}>
              {field.type === "file" ? (
                <Box>
                  <Typography sx={{ mb: 1 }}>{field.label}</Typography>
                  <Button variant="outlined" component="label">
                    Select Image
                    <input
                      type="file"
                      name={field.name}
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, field.name)}
                    />
                  </Button>
                  {previewImages[field.name] && (
                    <Box mt={2}>
                      <img
                        src={previewImages[field.name]}
                        alt="Preview"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ddd",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  select={field.select || false}
                  SelectProps={field.select ? { native: true } : undefined}
                  value={
                    field.select
                      ? String(formValues[field.name] ?? "")
                      : formValues[field.name] || ""
                  }
                  onChange={handleChange}
                  required={field.required}
                  InputProps={{
                    sx: {
                      height: 45,
                      fontSize: 14,
                      padding: "0 14px", 
                    },
                  }}
                >
                  {field.select &&
                    field.options?.map((opt, j) => (
                      <option key={j} value={String(opt.value)}>
                        {opt.label}
                      </option>

                    ))}
                </TextField>


              )}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mt: 5, mb: 3 }} />

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<AddIcon />}
            sx={{ borderRadius: "18px", px: 3 }}
          >
            {submitText}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{ borderRadius: "18px", px: 3 }}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddForm;
