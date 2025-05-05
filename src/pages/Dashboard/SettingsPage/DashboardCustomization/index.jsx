import React from 'react';
import { Box, Card, Typography, FormControlLabel, Switch, IconButton } from '@mui/material';
import { Layout, ChevronUp, ChevronDown } from 'lucide-react';

const DashboardCustomization = ({ cardStyles, headerBarStyles, sectionTitleStyles, widgetItemStyles, widgetTextStyles, settings, setSettings }) => {
  const handleWidgetToggle = (widgetId) => {
    setSettings((prev) => ({
      ...prev,
      widgets: prev.widgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      ),
    }));
  };

  const handleMoveWidget = (widgetId, direction) => {
    const widgetIndex = settings.widgets.findIndex((widget) => widget.id === widgetId);
    const newWidgets = [...settings.widgets];
    const swapIndex = direction === 'up' ? widgetIndex - 1 : widgetIndex + 1;

    if (swapIndex >= 0 && swapIndex < newWidgets.length) {
      [newWidgets[widgetIndex], newWidgets[swapIndex]] = [newWidgets[swapIndex], newWidgets[widgetIndex]];
      setSettings((prev) => ({ ...prev, widgets: newWidgets }));
    }
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={headerBarStyles} />
      <Typography sx={sectionTitleStyles}>
        <Layout size={20} /> Dashboard Customization
      </Typography>
      {settings.widgets.map((widget, index) => (
        <Box key={widget.id} sx={widgetItemStyles}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Switch checked={widget.enabled} onChange={() => handleWidgetToggle(widget.id)} />}
              label={widget.name}
              sx={{ '& .MuiFormControlLabel-label': widgetTextStyles }}
            />
          </Box>
          <Box>
            <IconButton
              onClick={() => handleMoveWidget(widget.id, 'up')}
              disabled={index === 0}
            >
              <ChevronUp size={16} color={index === 0 ? '#ccc' : '#02042D'} />
            </IconButton>
            <IconButton
              onClick={() => handleMoveWidget(widget.id, 'down')}
              disabled={index === settings.widgets.length - 1}
            >
              <ChevronDown size={16} color={index === settings.widgets.length - 1 ? '#ccc' : '#02042D'} />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Card>
  );
};

export default DashboardCustomization;