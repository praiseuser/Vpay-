export const container = {
    bgcolor: '#F8FAFC',
    borderRadius: '24px',
    p: 3,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

export const titleStyle = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: '#17181A',
    mb: 2,
};

export const cardsWrapper = {
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap',
};

export const cardBase = {
    width: '220px',
    borderRadius: '18px',
    p: 2.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '150px',
};

// 🟦 Blue Card
export const blueCard = {
    ...cardBase,
    bgcolor: '#E3F2FD',
    border: '1px solid #90CAF9',
};

// 🟣 Purple Card
export const purpleCard = {
    ...cardBase,
    bgcolor: '#EDE7FF',
    border: '1px solid #B39DDB',
};

// 💚 Green Card (Fiat Balance)
export const greenCard = {
    ...cardBase,
    bgcolor: '#E8F5E9',
    border: '1px solid #81C784',
};

// 🟠 Orange Card (Fiat Withdrawal)
export const orangeCard = {
    ...cardBase,
    bgcolor: '#FFF3E0',
    border: '1px solid #FFB74D',
};

// 🔤 Shared Text Styles
export const titleText = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    color: '#64748B',
    fontWeight: 500,
    mb: 1,
};

export const amountText = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '28px',
    lineHeight: '40px',
    color: '#0F172A',
    fontWeight: 700,
    mb: 1,
};

// 🎯 Shared Button Style Template
const baseButton = {
    width: '60px',
    height: '28px',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    color: 'white',
    fontWeight: 500,
    textTransform: 'none',
    minWidth: 'unset',
    padding: 0,
};

export const blueButton = {
    ...baseButton,
    bgcolor: '#1E88E5',
    '&:hover': { bgcolor: '#1565C0' },
};

export const purpleButton = {
    ...baseButton,
    bgcolor: '#7E57C2',
    '&:hover': { bgcolor: '#5E35B1' },
};

export const greenButton = {
    ...baseButton,
    bgcolor: '#43A047',
    '&:hover': { bgcolor: '#2E7D32' },
};

export const orangeButton = {
    ...baseButton,
    bgcolor: '#FB8C00',
    '&:hover': { bgcolor: '#EF6C00' },
};
