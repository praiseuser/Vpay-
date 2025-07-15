import { TextField } from '@mui/material';

const inputFontStyle = {
  fontSize: '13px',
};

export default function FormInput({ name, label, value, onChange }) {
  return (
    <TextField
      fullWidth
      size="small"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      required
      InputProps={{ sx: { ...inputFontStyle, height: 45,  } }}
      InputLabelProps={{ sx: inputFontStyle }}
    />
  );
}