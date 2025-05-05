import { useMediaQuery } from '@mui/material';
import CustomTable from "../../../components/CustomTable/CustomTable";
import CustomButton from "../../../components/CustomButton/CustomButton";

const columns = [
  { id: 'country', label: 'COUNTRY', minWidth: 150 },
  { id: 'country_code', label: 'COUNTRY CODE', minWidth: 150 },
  { id: 'status', label: 'STATUS', minWidth: 120 },
  { id: 'date_activated', label: 'DATE ACTIVATED', minWidth: 180 },
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
    country: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Nigeria</span>,
    country_code: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>+234</span>,
    status: <CustomButton type="green" />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-09 | 09:23 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="disable" />
      </div>
    ),
  },
  {
    country: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Kenya</span>,
    country_code: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>+254</span>,
    status: <CustomButton type="green" />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-09 | 09:23 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="disable" />
      </div>
    ),
  },
  {
    country: <span style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>Uganda</span>,
    country_code: <span style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>+256</span>,
    status: <CustomButton type="green" />,
    date_activated: <span style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>2024-05-09 | 09:23 am</span>,
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <CustomButton type="disable" />
      </div>
    ),
  },
];

export default function ManageCountries() {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div
      className={`pt-${isMobile ? '2' : '3'} pb-${isMobile ? '2' : '4'} px-${isMobile ? '2' : '4'} w-full`}
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
          paddingTop: isMobile ? '2px' : '4px',
          paddingBottom: '16px',
        }}
      >
        <CustomTable
          columns={columns}
          rows={rows}
          showAddButton={true}
          addButtonTitle="Add Country"
          addButtonStyle={{ marginTop: '40px' }}
          title="Manage Countries"
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
          searchPlaceholder="search by country etc"
        />
      </div>
    </div>
  );
}