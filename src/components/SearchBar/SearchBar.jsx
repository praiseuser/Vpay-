import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const searchStyles = {
  width: { xs: "100%", sm: "308px" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    border: "1px solid #D9D9D9",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    color: "#BDBDBD",
    height: "40px",
    pl: "10px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#BDBDBD",
    opacity: 1,
  },
};

const SearchBar = () => (
  <TextField
    placeholder="Search by email, name, country, etc"
    variant="outlined"
    size="small"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon
            sx={{
              width: "10px",
              height: "10px",
              color: "#BDBDBD",
              border: "1px solid #BDBDBD",
              borderRadius: "2px",
            }}
          />
        </InputAdornment>
      ),
    }}
    sx={searchStyles}
  />
);

export default SearchBar;