import { TextField, MenuItem } from '@mui/material';

const inputFontStyle = {
  fontSize: '13px',
};

export default function SelectField({ name, label, value, options, onChange }) {
  console.log('SelectField render:', { name, label, value, options });

  return (
    <TextField
      select
      fullWidth
      size="small"
      name={name}
      label={label}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      required
      InputProps={{ sx: { ...inputFontStyle, height: 45,} }}
      InputLabelProps={{ sx: inputFontStyle }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: { zIndex: 2000 },
          },
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value || opt} value={opt.value || opt}>
          {typeof opt === 'string' ? opt : opt.label || opt.value}
        </MenuItem>
      ))}
    </TextField>
  );
}