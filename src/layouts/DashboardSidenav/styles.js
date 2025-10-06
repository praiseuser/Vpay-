export const styles = {
  sidebar: {
    width: (collapsed) => collapsed ? 80 : 260,
    flexShrink: 0,
    background: '#02042D',
    minHeight: '100vh',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'width 0.3s ease-in-out',
    overflowX: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    p: 2,
    borderBottom: '1px solid rgba(76, 175, 80, 0.3)',
    alignItems: 'center',
  },
  toggleButton: {
    color: '#fff',
    '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
    mr: 2,
  },
  navContainer: {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mt: 2,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 104px)',
    '&::-webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 56,
    padding: '8px 16px',
    borderRadius: 12,
    background: 'transparent',
    color: '#B0B3B8',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 255, 204, 0.1)',
      color: '#fff',
    },
    active: {
      background: 'transparent',
      color: '#00FFCC',
      shadow: '0 0 8px #00FFCC',
      hover: 'rgba(0, 255, 204, 0.2)',
    },
  },
 navText: {
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    color: 'inherit',
    whiteSpace: 'nowrap',  // prevent line break
    overflow: 'hidden',    // hide overflow
    textOverflow: 'ellipsis', // add ellipsis if too long
  },
};