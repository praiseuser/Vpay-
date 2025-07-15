import { Box } from '@mui/material';
import TableHeader from '../../CustomTable/TableHeader';

const TableHeaderComponent = ({
  title,
  titleStyle,
  searchTerm,
  handleSearchChange,
  searchPlaceholder,
  showAddButton,
  showFilterButton,
  addButtonTitle,
  addButtonStyle,
  onAddButtonClick,
  onFilterApply,
  countryOptions,
  networkOptions,
  statusOptions,
}) => {
  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', pb: 2 }}>
      <TableHeader
        title={title}
        titleStyle={titleStyle}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        searchPlaceholder={searchPlaceholder}
        showAddButton={showAddButton}
        showFilterButton={showFilterButton}
        addButtonTitle={addButtonTitle}
        addButtonStyle={addButtonStyle}
        onAddButtonClick={onAddButtonClick}
        onFilterApply={onFilterApply}
        countryOptions={countryOptions}
        networkOptions={networkOptions}
        statusOptions={statusOptions}
      />
    </Box>
  );
};

export default TableHeaderComponent;