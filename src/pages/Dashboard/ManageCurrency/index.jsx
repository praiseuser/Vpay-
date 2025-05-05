import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import CryptoCurrencyPage from './CryptoCurrencyPage';
import FiatCurrencyPage from './FiatCurrencyPage';

export default function ManageCurrency() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [activeTab, setActiveTab] = useState(0); 

  return (
    <div
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100vh' : 'auto',
        overflow: 'hidden',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <CustomTabs
          tabLabels={["Crypto Currency", "FIAT Currency"]} 
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginTop: '32px',
        }}
      >
        {activeTab === 0 && <CryptoCurrencyPage />}
        {activeTab === 1 && <FiatCurrencyPage />} 
      </div>
    </div>
  );
}
