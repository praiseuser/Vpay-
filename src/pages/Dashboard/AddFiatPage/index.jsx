import React, { useState } from "react";
import {
    Box,
    FormControl,
    OutlinedInput,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import PasswordModal from "../Card/PasswordModal";
import CustomErrorToast from "../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../components/CustomSuccessToast";
import { useCreateFiatCurrency } from "../../../Hooks/useFiatCurrency";

const AddFiatPage = () => {
    const [currency, setCurrency] = useState("");
    const [currencyCode, setCurrencyCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [activityPin, setActivityPin] = useState("");

    const createFiatCurrency = useCreateFiatCurrency();

    const handleSubmit = () => {
        if (!currency || !currencyCode || !countryCode) {
            CustomErrorToast("Please fill in all required fields.");
            return;
        }
        setShowPasswordModal(true);
    };

    const handlePasswordSubmit = async () => {
        setLoading(true);
        try {
            const formData = {
                fiat_currency_name: currency,
                fiat_currency_code: currencyCode,
                country_code: countryCode,
                status: "1",
            };

            const response = await createFiatCurrency(formData, activityPin);

            if (response) {
                CustomSuccessToast("Fiat currency added successfully!");
                setShowPasswordModal(false);

                setCurrency("");
                setCurrencyCode("");
                setCountryCode("");
                setActivityPin("");
            }
        } catch (error) {
            console.error("Error adding fiat:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                pb: "2rem",
                maxWidth: 1000,
                mx: "auto",
                borderRadius: "10px",
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                borderBottom="2px solid #D9D9D9"
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        px: "2rem",
                        py: "2rem",
                        color: "#4A85F6",
                    }}
                >
                    Add Fiat Currency
                </Typography>
            </Stack>

            <Stack direction="row" flexWrap="wrap" gap={3} p={2}>
                <FormControl sx={{ minWidth: 250 }}>
                    <Typography variant="caption">Currency Name</Typography>
                    <OutlinedInput
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        placeholder="Enter currency name (e.g., US Dollar)"
                        sx={{
                            backgroundColor: "#D9D9D9",
                            borderRadius: "10px",
                            height: "40px",
                        }}
                    />
                </FormControl>

                <FormControl sx={{ minWidth: 250 }}>
                    <Typography variant="caption">Currency Code</Typography>
                    <OutlinedInput
                        value={currencyCode}
                        onChange={(e) => setCurrencyCode(e.target.value)}
                        placeholder="Enter currency code (e.g., USD)"
                        sx={{
                            backgroundColor: "#D9D9D9",
                            borderRadius: "10px",
                            height: "40px",
                        }}
                    />
                </FormControl>

                <FormControl sx={{ minWidth: 250 }}>
                    <Typography variant="caption">Country Code</Typography>
                    <OutlinedInput
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        placeholder="Enter country code (e.g., US)"
                        sx={{
                            backgroundColor: "#D9D9D9",
                            borderRadius: "10px",
                            height: "40px",
                        }}
                    />
                </FormControl>
            </Stack>

            <Box display="flex" gap={3} mt={3} pl={2}>
                <Button variant="outlined" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#4A85F6", color: "white" }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Fiat +"}
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

export default AddFiatPage;
