import { Height } from "@mui/icons-material";

export const styles = {
  container: {
    width: '100%',
    padding: '15px',
    fontFamily: 'Raleway, sans-serif',
    backgroundColor: 'white',
    color: '#2D3748',
    borderRadius: '30px',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    width: '100%',
  },
  column: {
    flex: 1,
  },
  moduleBlock: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #E2E8F0', 
  },
  moduleTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2B6CB0', 
    marginBottom: '12px',
  },
  checkboxLabelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginLeft: 28, 
  },
  permissionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  permissionLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#718096', // muted gray
    flex: 1,
    textAlign: 'center',
  },
  permissionSwitches: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  switchWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '32px',
    gap: '12px',
  },
  backButton: {
    padding: '12px 28px',
    backgroundColor: '#E53E3E', 
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  backButtonHover: {
    backgroundColor: '#C53030',
  },
  updateButton: {
    padding: '12px 28px',
    backgroundColor: '#38A169', 
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  updateButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
};
