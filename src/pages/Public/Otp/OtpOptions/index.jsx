import { Box, Button } from '@mui/material';

const OtpOptions = ({ options, selectedOption, onSelect, otpSentOption, sx }) => (
  <Box sx={sx.container}>
    {options.map((option) => (
      <Button
        key={option}
        onClick={() => onSelect(option)}
        variant="outlined"
        disabled={otpSentOption === option}
        sx={{
          ...sx.button,
          cursor: otpSentOption === option ? 'not-allowed' : 'pointer',
          '&:hover': otpSentOption === option
            ? {}
            : {
              backgroundColor: sx.active.backgroundColor,
              color: sx.active.color,
              borderColor: sx.active.borderColor || sx.button.borderColor,
            },
        }}
      >
        {option.toUpperCase()}
      </Button>
    ))}
  </Box>
);

export default OtpOptions;
