import { useMediaQuery } from '@mui/material';
import CustomTable from "../../../components/CustomTable/CustomTable";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import { useState } from "react";

const columns = [
  { id: 'currency', label: 'CURRENCY', minWidth: 150 },
  { id: 'network', label: 'NETWORK', minWidth: 150 },
  { id: 'rate', label: 'RATE', minWidth: 180 },
  { id: 'action', label: '', minWidth: 180 },
];

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const rows = [
  {
    currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Bitcoin (BTC)</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>BEP 20</span>,
    rate: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>1 USD - 0.00012 BTC  </span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
      </div>
    ),
  },
  {
    currency: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Binance (BNB)</span>,
    network: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>BEP 20</span>,
    rate: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>1 USD - 0.00012 BTC  </span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="edit" />
      </div>
    ),
  },

];

export default function ManageRate() {
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
         value={tabValue}
         onChange={handleTabChange}
         />
      </div>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginTop: '32px',
        }}
      >
        <CustomTable
          columns={columns}
          rows={rows}
          showAddButton={false}
          addButtonTitle=""
          addButtonStyle={{ marginTop: '40px' }}
          title="Manage Rates"
          titleStyle={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '100%',
            letterSpacing: '0px',
            color: '#333333',
            marginLeft: '24px',
            marginBottom: '7px',
          }}
          searchPlaceholder="search"
        />
      </div>
    </div>
  );
}