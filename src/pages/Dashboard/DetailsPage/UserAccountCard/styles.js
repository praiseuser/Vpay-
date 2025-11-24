export const container = {
  bgcolor: 'white',
  borderRadius: '24px',
  p: 2.5,
  boxShadow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export const titleText = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '16px',
  color: '#17181A',
  mb: 3,
};

export const cardsWrapper = {
  display: 'flex',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  gap: '3px',
  width: '100%',
};

export const accountCard = {
  bgcolor: 'white',
  border: '2.5px solid #DCE7EC',
  borderRadius: '18px',
  width: '340px',
  minHeight: '160px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.08)',
    borderColor: '#B8D5E0',
  },
};

export const walletIconBox = {
  width: 50,
  height: 50,
  borderRadius: '50%',
  bgcolor: '#E3F2FD',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 1.2,
};

export const balanceText = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '30px',
  color: '#0F67B1',
  letterSpacing: '0.5px',
};

export const subText = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '13px',
  color: '#6B7280',
  letterSpacing: '0.3px',
};

export const btcWrapper = {
  display: 'flex',
  flexDirection: 'row',
  gap: '3px',
  flex: '1 1 0',
  justifyContent: 'space-between',
};

export const btcCard = {
  flex: '1 1 0',
  maxWidth: '25%',
  borderRadius: '18px',
  p: 2,
  bgcolor: '#F8FAFC',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const btcHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 0.5,
};

export const btcImage = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  objectFit: 'cover',
};

export const btcText = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: '13px',
  color: '#45B5B9',
};

export const btcPercent = {
  fontFamily: 'Work Sans',
  fontWeight: 400,
  fontSize: '11px',
  color: '#45B5B9',
};

export const btcAmount = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: '16px',
  color: '#17181A',
};

export const btcUsd = {
  fontFamily: 'Poppins',
  fontWeight: 500,
  fontSize: '11px',
  color: '#17181A',
};

export const purpleButton = {
  backgroundColor: '#7B61FF',
  color: 'white',
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: '12px',
  fontSize: '13px',
  padding: '6px 16px',
  mt: 1.5,
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#6A4FE0',
  },
};
