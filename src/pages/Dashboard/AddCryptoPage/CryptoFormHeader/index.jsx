import React from 'react';
import { Typography, Divider } from '@mui/material';
import styles from '../AddCryptoPageStyles';

const CryptoFormHeader = () => {
  return (
    <>
      <Typography sx={styles.title}>
        Add Crypto
      </Typography>
      <Divider sx={styles.divider} />
    </>
  );
};

export default CryptoFormHeader;