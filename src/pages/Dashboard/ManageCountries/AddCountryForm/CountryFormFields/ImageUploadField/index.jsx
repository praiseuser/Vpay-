import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Typography } from '@mui/material';
import { imagePreviewStyle, imageStyle } from '../../countryFormStyles';

const ImageUploadField = ({ onImageUpload, imageSrc }) => (
  <Box sx={{ gridColumn: 'span 2' }}>
    <Button variant="outlined" component="label" size="medium">
      Upload Flag Image
      <input type="file" hidden accept="image/*" onChange={onImageUpload} />
    </Button>
    {imageSrc && (
      <Box sx={imagePreviewStyle}>
        <Typography variant="body2">Preview:</Typography>
        <img src={imageSrc} alt="Country Flag" style={imageStyle} />
      </Box>
    )}
  </Box>
);

ImageUploadField.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
};

export default ImageUploadField;