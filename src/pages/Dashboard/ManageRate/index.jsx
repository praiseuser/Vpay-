import { useState } from 'react';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import CreateRateForm from '../ManageRate/CreateRateForm';
import FiatRate from '../ManageRate/FiatRate';

const ManageRate = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showAddRateForm, setShowAddRateForm] = useState(false);
  const [rates, setRates] = useState([]);
  const [formData, setFormData] = useState({
    currency_id: '',
    Rate: '',
    status: '1',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddRateForm = () => {
    setShowAddRateForm(true);
  };

  const handleCreateRate = () => {
    if (!formData.currency_id || !formData.Rate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRate = {
      currency_id: formData.currency_id,
      Rate: formData.Rate,
      status: parseInt(formData.status),
    };

    setRates((prev) => [...prev, newRate]);
    setFormData({ currency_id: '', Rate: '', status: '1' });
    setShowAddRateForm(false);
  };

  const handleCancel = () => {
    setFormData({ currency_id: '', Rate: '', status: '1' });
    setShowAddRateForm(false);
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
          <CreateRateForm
            formData={formData}
            setFormData={setFormData}
            handleCreateRate={handleCreateRate}
            handleCancel={handleCancel}
          />
        ) : (
          <FiatRate rates={rates} onAddButtonClick={handleAddRateForm} />
        )}
      </div>
    </div>
  );
};

export default ManageRate;
