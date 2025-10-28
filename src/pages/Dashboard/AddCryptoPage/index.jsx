import React, { useState } from "react";
import AddForm from "../../../components/AddForm";
import PasswordModal from "../Card/PasswordModal";
import { useCreateCryptoCurrency } from "../../../Hooks/useCryptoCurrency";
import CustomErrorToast from "../../../components/CustomErrorToast";
import CustomSuccessToast from "../../../components/CustomSuccessToast";

const AddCryptoPage = () => {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [chain, setChain] = useState("");
  const [network, setNetwork] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activityPin, setActivityPin] = useState("");

  const createCryptoCurrency = useCreateCryptoCurrency();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cryptoName || !cryptoSymbol || !chain || !network) {
      CustomErrorToast("Please fill in all required fields.");
      return;
    }

    if (!image) {
      CustomErrorToast("Please upload a crypto image before proceeding.");
      return;
    }

    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (!image) {
      CustomErrorToast("Crypto image is required before submission.");
      return;
    }

    setLoading(true);
    try {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(image);

      const formData = {
        crypto_name: cryptoName,
        crypto_symbol: cryptoSymbol,
        chain: chain,
        network: network,
        status: "1",
        crypto_image: base64Image,
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
        setImage(null);
        setImagePreview("");
      }
    } catch (error) {
      CustomErrorToast("Something went wrong while adding crypto.");
    } finally {
      setLoading(false);
    }
  };

  const textFields = [
    {
      label: "Crypto Name",
      name: "crypto_name",
      value: cryptoName,
      onChange: (e) => setCryptoName(e.target.value),
      placeholder: "Enter crypto name",
      required: true,
    },
    {
      label: "Crypto Symbol",
      name: "crypto_symbol",
      value: cryptoSymbol,
      onChange: (e) => setCryptoSymbol(e.target.value),
      placeholder: "Enter symbol (e.g., BTC)",
      required: true,
    },
    {
      label: "Chain",
      name: "chain",
      value: chain,
      onChange: (e) => setChain(e.target.value),
      placeholder: "Enter chain (e.g., Ethereum)",
      required: true,
    },
    {
      label: "Network",
      name: "network",
      value: network,
      onChange: (e) => setNetwork(e.target.value),
      select: true,
      options: [
        { value: "", label: "Select Network" },
        { value: "mainnet", label: "Mainnet" },
        { value: "testnet", label: "Testnet" },
      ],
      required: true,
    },
    {
      label: "Upload Image",
      name: "image",
      type: "file",
      onChange: handleImageChange,
      preview: imagePreview,
    },
  ];

  return (
    <>
      <AddForm
        title="Add CryptoCurrency"
        description="Fill in the details below to add a new cryptocurrency."
        textFields={textFields}
        onSubmit={handleSubmit}
      />

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
    </>
  );
};

export default AddCryptoPage;
