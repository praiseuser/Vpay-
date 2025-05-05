import React from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';

const ProfileForm = ({ profile, isEditing, handleChange, handleProfilePictureChange, handleEditToggle, handleSave, labelStyles, valueStyles, textFieldStyles, buttonStyles }) => (
  <>
    {isEditing && (
      <Box sx={{ mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="profile-picture-upload"
          type="file"
          onChange={handleProfilePictureChange}
        />
        <label htmlFor="profile-picture-upload">
          <Button variant="outlined" component="span" sx={buttonStyles.outlined}>
            Upload Profile Picture
          </Button>
        </label>
      </Box>
    )}
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Name</Typography>
          {isEditing ? (
            <TextField
              name="name"
              value={profile.name}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          ) : (
            <Typography sx={valueStyles}>{profile.name}</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Email</Typography>
          {isEditing ? (
            <TextField
              name="email"
              value={profile.email}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          ) : (
            <Typography sx={valueStyles}>{profile.email}</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Phone Number</Typography>
          {isEditing ? (
            <TextField
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          ) : (
            <Typography sx={valueStyles}>{profile.phone}</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Role</Typography>
          <Typography sx={valueStyles}>{profile.role}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Admin ID</Typography>
          <Typography sx={valueStyles}>{profile.adminId}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Joined</Typography>
          <Typography sx={valueStyles}>{profile.joined}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography sx={labelStyles}>Last Login</Typography>
          <Typography sx={valueStyles}>{profile.lastLogin}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography sx={labelStyles}>Bio</Typography>
          {isEditing ? (
            <TextField
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              sx={textFieldStyles}
              multiline
              rows={3}
            />
          ) : (
            <Typography sx={valueStyles}>{profile.bio || 'No bio provided.'}</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
      {isEditing ? (
        <>
          <Button variant="contained" onClick={handleSave} sx={buttonStyles.contained}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleEditToggle} sx={buttonStyles.outlined}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={handleEditToggle} sx={buttonStyles.contained}>
          Edit Profile
        </Button>
      )}
    </Box>
  </>
);

export default ProfileForm;