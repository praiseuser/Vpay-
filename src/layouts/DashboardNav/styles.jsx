export const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    height: { xs: 48, md: 64 },
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'flex-start', md: 'space-between' },
    alignItems: { xs: 'flex-start', md: 'center' },
    padding: { xs: '8px 12px', md: '0 16px' },
    zIndex: 1200,
    transition: 'left 0.3s ease, width 0.3s ease, height 0.3s ease',
  },

  navLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: { xs: 1, md: 0 },
    width: { xs: '100%', md: 'auto' },
  },

  navTitle: {
    fontWeight: 700,
    fontSize: { xs: '16px', md: '18px' },
    color: '#0C0B18',
    lineHeight: '20px',
    marginBottom: { xs: 0, md: 0 },
  },

  userHandleText: {
    fontSize: { xs: '10px', md: '12px' },
    color: '#646464',
    marginLeft: { xs: 1, md: 0 },
    marginTop: { xs: 0, md: '-2px' },
    lineHeight: '16px',
    display: { xs: 'none', sm: 'block' },
  },

  container: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    width: { xs: '100%', md: 'auto' },
    mt: { xs: 1, md: 0 },
  },

  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '16px', md: '24px' },
    flexWrap: 'wrap',
    width: { xs: '100%', md: 'auto' },
  },

  searchBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    border: '1px solid #ddd',
    padding: { xs: '4px 8px', md: '6px 12px' },
    width: { xs: '100%', md: 240 },
    maxWidth: { xs: 200, md: 240 },
    height: { xs: 32, md: 35 },
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
  },

  searchIcon: {
    color: '#646464',
    marginRight: { xs: 4, md: 8 },
    fontSize: { xs: 14, md: 15 },
  },

  searchInput: {
    fontSize: { xs: '12px', md: '13px' },
    color: '#0C0B18',
    flexGrow: 1,
    '& .MuiInputBase-input::placeholder': {
      color: '#646464',
      opacity: 1,
    },
  },

  iconBox: {
    cursor: 'pointer',
    position: 'relative',
  },

  iconSize: {
    fontSize: { xs: 18, md: 20 },
    color: '#646464',
    '&:hover': {
      color: '#208BC9',
    },
  },

  userInfo: {
    cursor: 'pointer',
  },

  userAvatar: {
    width: { xs: 32, md: 40 },
    height: { xs: 32, md: 40 },
    borderRadius: '50%',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  userAvatarText: {
    fontWeight: 500,
    fontSize: { xs: '16px', md: '18px' },
    fontFamily: 'Mada, sans-serif',
    color: 'grey',
  },

  activeIndicator: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: { xs: 8, md: 10 },
    height: { xs: 8, md: 10 },
    backgroundColor: 'green',
    borderRadius: '50%',
    border: '2px solid white',
  },

  userDetails: {
    display: { xs: 'none', md: 'block' },
    opacity: 1,
    visibility: 'visible',
  },

  userName: {
    fontWeight: 500,
    fontFamily: 'Mada, sans-serif',
    color: '#0C0B18',
    fontSize: { xs: '12px', md: '13px' },
    marginLeft: 1,
  },
};