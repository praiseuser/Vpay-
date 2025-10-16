import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  FormControl,
  OutlinedInput,
  Select,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PasswordModal from "../Card/PasswordModal";
import { useCreateCryptoCurrency } from "../../../Hooks/useCryptoCurrency";
import CustomErrorToast from "../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../components/CustomSuccessToast";

const AddCryptoPage = () => {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [chain, setChain] = useState("");
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activityPin, setActivityPin] = useState("");

  const createCryptoCurrency = useCreateCryptoCurrency();

  const handleSubmit = () => {
    if (!cryptoName || !cryptoSymbol || !chain || !network) {
      CustomErrorToast("Please fill in all required fields.");
      return;
    }
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    setLoading(true);
    try {
      const formData = {
        crypto_name: cryptoName,
        crypto_symbol: cryptoSymbol,
        chain,
        network,
        status: "1",
      };

      const response = await createCryptoCurrency(formData, activityPin);
      if (response) {
        CustomSuccessToast("Crypto added successfully!");
        setShowPasswordModal(false);
        setCryptoName("");
        setCryptoSymbol("");
        setChain("");
        setNetwork("");
        setActivityPin("");
      }
    } catch (error) {
      console.error("Error adding crypto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        pb: "2rem",
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderBottom: "2px solid #D9D9D9",
          px: "2rem",
          py: "1.5rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#4A85F6",
          }}
        >
          Add Crypto
        </Typography>
      </Stack>

      {/* Form Fields */}
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "start", gap: 3, px: "2rem", pt: "2rem" }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 250 }}>
          <Typography variant="caption">Crypto Name</Typography>
          <OutlinedInput
            value={cryptoName}
            onChange={(e) => setCryptoName(e.target.value)}
            placeholder="Enter crypto name"
            sx={{
              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              height: "40px",
            }}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 250 }}>
          <Typography variant="caption">Crypto Symbol</Typography>
          <OutlinedInput
            value={cryptoSymbol}
            onChange={(e) => setCryptoSymbol(e.target.value)}
            placeholder="Enter symbol (e.g., BTC)"
            sx={{
              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              height: "40px",
            }}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 250 }}>
          <Typography variant="caption">Chain</Typography>
          <OutlinedInput
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            placeholder="Enter chain (e.g., Ethereum)"
            sx={{
              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              height: "40px",
            }}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 250 }}>
          <Typography variant="caption">Network</Typography>
          <Select
            native
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            input={<OutlinedInput />}
            sx={{
              backgroundColor: "#D9D9D9",
              borderRadius: "10px",
              height: "40px",
            }}
          >
            <option aria-label="None" value="" />
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </Select>
        </FormControl>
      </Stack>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "start", gap: 3, px: "2rem", pt: "2rem" }}>
        <Button
          variant="outlined"
          sx={{
            px: 4,
            py: 1,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            color: "#4A85F6",
            borderColor: "#4A85F6",
            "&:hover": { backgroundColor: "#4A85F6", color: "#fff" },
          }}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#4A85F6",
            "&:hover": { backgroundColor: "#3a6ecf" },
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Crypto +"}
        </Button>
      </Box>

      {showPasswordModal && (
        <PasswordModal
          open={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handlePasswordSubmit}
          password={activityPin}
          setPassword={setActivityPin}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default AddCryptoPage;
