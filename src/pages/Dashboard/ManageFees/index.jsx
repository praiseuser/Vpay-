import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import FeeTabs from './FeeTabs';
import FeeTable from './FeeTable';
import AddFeeForm from './AddFeeForm';
import EditFeeModal from './EditFeeModal';
import { useFetchFees, useDeleteTransactionFee } from '../../../Hooks/useFeeCurrency';


export default function ManageFees() {
  const [tabValue, setTabValue] = useState(0);
  const [showAddFeeForm, setShowAddFeeForm] = useState(false);
  const [editFee, setEditFee] = useState(null);
  const [formData, setFormData] = useState({
    fee_name: '',
    fee_type: '',
    fee_amount: '',
    status: false,
    has_max_limit: false,
    max_limit: '',
  });
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { fees, fetchFees, loading: fetchLoading, error: fetchError } = useFetchFees();
  const { deleteTransactionFee, isFeeLoading, error: deleteError, successMessage } = useDeleteTransactionFee();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddFeeClick = () => {
    console.log('Add Fee button clicked in ManageFees');
    setFormData({
      fee_name: '',
      fee_type: '',
      fee_amount: '',
      status: false,
      has_max_limit: false,
      max_limit: '',
    });
    setShowAddFeeForm(true);
  };

  const handleCreateFee = () => {
    console.log('handleCreateFee called in ManageFees');
    setFormData({
      fee_name: '',
      fee_type: '',
      fee_amount: '',
      status: false,
      has_max_limit: false,
      max_limit: '',
    });
    setShowAddFeeForm(false);
    fetchFees();
  };

  const handleCancel = () => {
    console.log('handleCancel called in ManageFees');
    setFormData({
      fee_name: '',
      fee_type: '',
      fee_amount: '',
      status: false,
      has_max_limit: false,
      max_limit: '',
    });
    setShowAddFeeForm(false);
    setEditFee(null);
  };

  const handleEditFee = (fee) => {
    console.log('Edit fee clicked:', fee);
    setEditFee(fee);
  };

  const handleUpdateFee = () => {
    console.log('handleUpdateFee called in ManageFees');
    setEditFee(null);
    fetchFees();
  };

  const handleDeleteFee = async (feeId) => {
    console.log('handleDeleteFee started with feeId:', feeId);
    if (!feeId) {
      console.error('No feeId provided for deletion in ManageFees');
      return;
    }

    const deleteResult = await deleteTransactionFee(feeId);
    if (deleteResult) {
      console.log('Delete successful in ManageFees, refreshing fees list');
      setShowAddFeeForm(false);
      setEditFee(null);
      setFormData({
        fee_name: '',
        fee_type: '',
        fee_amount: '',
        status: false,
        has_max_limit: false,
        max_limit: '',
      });
      fetchFees();
    } else {
      console.log('Delete failed in ManageFees, error already logged in useDeleteTransactionFee');
    }
    console.log('handleDeleteFee completed for feeId:', feeId);
  };

  console.log('ManageFees rendering - fees:', fees, 'showAddFeeForm:', showAddFeeForm, 'editFee:', editFee);

  return (
    <div
      className={`p-${isMobile ? '2' : '6'} w-full`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100vh' : 'auto',
        overflow: 'hidden',
      }}
    >
      <FeeTabs value={tabValue} onChange={handleTabChange} />
      <div style={{ flexGrow: 1, overflowY: 'auto', marginTop: '32px' }}>
        {showAddFeeForm ? (
          <AddFeeForm
            formData={formData}
            setFormData={setFormData}
            handleCreateFee={handleCreateFee}
            handleCancel={handleCancel}
          />
        ) : (
          <FeeTable
            fees={fees}
            fetchLoading={fetchLoading}
            fetchError={fetchError}
            deleteError={deleteError}
            successMessage={successMessage}
            isFeeLoading={isFeeLoading}
            onAddFeeClick={handleAddFeeClick}
            onEditFee={handleEditFee}
            onDeleteFee={handleDeleteFee}
          />
        )}
        <EditFeeModal
          open={!!editFee}
          fee={editFee}
          onClose={handleCancel}
          onUpdate={handleUpdateFee}
        />
      </div>
    </div>
  );
}

ManageFees.propTypes = {
};