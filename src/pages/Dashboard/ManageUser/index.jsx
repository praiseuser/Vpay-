import { useState } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import CustomTable from '../../../components/CustomTable';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import User from '../User';

const columns = [
  { id: 'currency', label: 'USER', minWidth: 150 },
  { id: 'network', label: 'EMAIL/PHONE', minWidth: 150 },
  { id: 'status', label: 'COUNTRY', minWidth: 120 },
  { id: 'date_activated', label: 'JOINED AT', minWidth: 180 },
  { id: 'balance', label: 'BALANCE', minWidth: 120 },
  { id: 'action', label: '', minWidth: 180 },
];

const rowStyle = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  lineHeight: '20px',
  letterSpacing: '0.3%',
};

const rawData = [
  {
    id: '1',
    username: 'Prudent Studio',
    handle: '@prudent',
    email: 'prudentgps@gmail.com',
    phone: '+2347088550832',
    country: 'Nigeria',
    date_activated: '2024-05-09 | 09:23 am',
    days_ago: '2 days ago',
    balance: 35009,
    network: 'Ethereum',
    status: 'Active',
  },
];

const formatRows = (data) =>
  data.map((item) => ({
    currency: (
      <div>
        <div style={{ ...rowStyle, fontWeight: 700, color: '#73757C' }}>{item.username}</div>
        <div style={{ ...rowStyle, fontWeight: 800, color: '#28C3FF' }}>{item.handle}</div>
      </div>
    ),
    network: (
      <div>
        <div style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>{item.email}</div>
        <div style={{ ...rowStyle, fontWeight: 400, color: '#363853' }}>{item.phone}</div>
      </div>
    ),
    status: (
      <div style={{ ...rowStyle, fontWeight: 500, color: '#73757C', lineHeight: '16px', marginTop: '-16px' }}>
        {item.country}
      </div>
    ),
    date_activated: (
      <div>
        <div style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>{item.date_activated}</div>
        <div style={{ ...rowStyle, fontWeight: 500, color: '#73757C' }}>{item.days_ago}</div>
      </div>
    ),
    balance: (
      <div style={{ ...rowStyle, fontWeight: 500, color: '#73757C', lineHeight: '16px', marginTop: '-16px' }}>
        ${item.balance.toLocaleString()}
      </div>
    ),
    action: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
        <ArrowForwardIosIcon style={{ width: '15px', height: '15px', color: '#73757C' }} />
      </div>
    ),
  }));

export default function ManageUser() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [isUserActive, setIsUserActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const rows = formatRows(rawData);

  const handleRowClick = () => {
    setIsUserActive(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      {isUserActive ? (
        <User />
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingTop: isMobile ? '2px' : '4px',
            paddingBottom: '16px',
            width: '100%',
            backgroundColor: '#fff',
            padding: isMobile ? '8px' : '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'white',
              p: 1,
              borderRadius: '16px',
              boxShadow: '0 8px 10px rgba(0, 0, 0, 0.1)',
            }}
          >

            <CustomTable
              columns={columns}
              rows={rows}
              showAddButton={false}
              showFilterButton={true}
              addButtonTitle="Add Country"
              addButtonStyle={{ marginTop: '40px' }}
              title=""
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
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              searchPlaceholder="Search by country, email, etc"
              onRowClick={handleRowClick}
            />
          </Box>

        </Box>
      )}
    </div>
  );
}