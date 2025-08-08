import {  dashbaordNavHeight, dashboardDrawerWidth, dashboardLayoutPad } from '../constants/dimensions';

export const styles = {
  wrap: {
    display: 'flex',
    backgroundColor: 'whitesmoke',
  },
  togBtn: {
    mr: 2,
    display: { sm: 'none' },
  },
  sidenavWrap: {
    width: { sm: dashboardDrawerWidth },
    flexShrink: { sm: 0 },
  },
  paperSm: {
    display: { xs: 'block', sm: 'none' },
    '& .MuiDrawer-paper': {
      backgroundColor: '#02042D',
      boxSizing: 'border-box',
      width: dashboardDrawerWidth,
      border: 'none',
    },
  },
  paperLg: {
    display: { xs: 'none', sm: 'block' },
    '& .MuiDrawer-paper': {
      backgroundColor: '#02042D',
      boxSizing: 'border-box',
      width: dashboardDrawerWidth,
      border: 'none',
    },
  },
  content: {
    flexGrow: 1,
    boxSizing: 'border-box',
    pl: `${dashboardLayoutPad}px`,
    pr: `${dashboardLayoutPad}px`,
    pt: `${dashbaordNavHeight + dashboardLayoutPad}px`,
    pb: `${dashboardLayoutPad}px`,
    maxWidth: '100%',
    minHeight: '100vh',
  },
  sidenav: {
    boxSizing: 'border-box',
    px: 5,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#02042D',
    minHeight: '100vh',
  },
  logoWrap: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    px: '16px',
  },
};