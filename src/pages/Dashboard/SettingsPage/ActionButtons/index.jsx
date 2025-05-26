import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { buttonStyles } from '../SettingsPageStyles';

const ActionButtons = ({ isEditing, isSaving, handleCreate, handleSave }) => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          padding: 2,
          bgcolor: '#fff',
          borderTop: '1px solid #e0e0e0',
          position: 'sticky',
          bottom: 0,
          zIndex: 1000,
          minHeight: 60,
        }}
      >
        {!isEditing && (
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={isSaving}
            sx={buttonStyles.create}
          >
            {isSaving ? 'Creating...' : 'Create'}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving || !isEditing}
          sx={buttonStyles.save}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Grid>
  );
};

export default ActionButtons;