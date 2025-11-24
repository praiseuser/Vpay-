import { useState } from 'react';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import CreateRateForm from '../ManageRate/CreateRateForm';
import EditRate from './EditRate';
import FiatRate from '../ManageRate/FiatRate';

const ManageRate = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showAddRateForm, setShowAddRateForm] = useState(false);
  const [showEditRateForm, setShowEditRateForm] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddRateForm = () => {
    setShowAddRateForm(true);
    setShowEditRateForm(false);
  };

  const handleEditRate = (rateData) => {
    setSelectedRate(rateData);
    setShowEditRateForm(true);
    setShowAddRateForm(false);
  };

  const handleUpdateSuccess = () => {
    setShowEditRateForm(false);
    setSelectedRate(null);
    // Add your refresh logic here if needed
  };

  const handleCancel = () => {
    setShowAddRateForm(false);
    setShowEditRateForm(false);
    setSelectedRate(null);
  };

  return (
    <div
      className="manage-rate-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        overflow: 'hidden',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <CustomTabs
          tabLabels={['FIAT Currency']}
          value={tabValue}
          onChange={handleTabChange}
        />
      </div>

      <div className="manage-rate-content-box">
        {showAddRateForm ? (
          <CreateRateForm handleCancel={handleCancel} />
        ) : showEditRateForm ? (
          <EditRate
            rateData={selectedRate}
            onUpdateSuccess={handleUpdateSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <FiatRate 
            onAddButtonClick={handleAddRateForm}
            onEditRate={handleEditRate}
          />
        )}
      </div>
    </div>
  );
};

export default ManageRate;