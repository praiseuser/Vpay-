import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

const inputFontStyle = {
  fontSize: '13px',
};

export default function MultiSelectField({ name, label, value, options, onChange }) {
  const renderSelectedValues = (selected) => {
    return selected
      .map((selectedId) => {
        const found = options.find((opt) => String(opt.id) === String(selectedId));
        return found?.admin_type || 'Unknown';
      })
      .join(', ');
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-label`} sx={inputFontStyle}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        multiple
        name={name}
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} size="small" sx={{ ...inputFontStyle, height: 45, }} />}
        renderValue={renderSelectedValues}
        MenuProps={{
          disablePortal: true,
          PaperProps: {
            sx: { zIndex: 3000 },
          },
        }}
        sx={inputFontStyle}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={String(option.id)}>
            <Checkbox checked={value.includes(String(option.id))} />
            <ListItemText primary={option.admin_type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}