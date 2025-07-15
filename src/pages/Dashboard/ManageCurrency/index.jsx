import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
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
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {activeTab === 0 && (
          <CryptoCurrencyPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
          />
        )}
        {activeTab === 1 && (
          <FiatCurrencyPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}