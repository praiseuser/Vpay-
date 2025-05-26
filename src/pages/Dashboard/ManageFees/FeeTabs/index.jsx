import PropTypes from 'prop-types';
import CustomTabs from '../../../../components/CustomTabs/CustomTabs';

function FeeTabs({ value, onChange }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <CustomTabs
        tabLabels={['Transaction Fees']}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

FeeTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FeeTabs;