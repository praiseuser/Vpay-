import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box } from '@mui/material';
import ModalHeader from '../EditFiatStatusModal/ModalHeader';
import StatusDisplay from '../EditFiatStatusModal/StatusDisplay';
import ModalActions from '../EditFiatStatusModal/ModalActions';
import { modalContainerStyle, modalBoxStyle } from '../EditFiatStatusModal/fiatModalStyles';

const EditFiatStatusModal = ({ open, onClose, fiatData, onSave }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="edit-fiat-status-modal"
    sx={modalContainerStyle}
  >
    <Box sx={modalBoxStyle}>
      <ModalHeader fiatCurrency={fiatData?.Fiat_Currency} />
      <StatusDisplay status={fiatData?.status} />
      <ModalActions onCancel={onClose} onSave={onSave} />
    </Box>
  </Modal>
);

EditFiatStatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fiatData: PropTypes.shape({
    Fiat_Currency: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  onSave: PropTypes.func.isRequired,
};

EditFiatStatusModal.defaultProps = {
  fiatData: null,
};

export default EditFiatStatusModal;