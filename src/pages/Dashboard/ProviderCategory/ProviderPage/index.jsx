import React, { useState } from "react";
import CreateCategoryProviderForm from "../AddProvider";
import ProviderCategory from "../index";
import { useGetProviderCategory } from "../../../../Hooks/useProviderCategory";

const ProviderPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);


  const { categoryData, loading, refetch } = useGetProviderCategory();

  const handleOpenAddForm = () => setShowAddForm(true);


  const handleSuccess = () => {
    setShowAddForm(false);
    refetch(); 
  };

  return (
    <div>
      {showAddForm ? (
        <CreateCategoryProviderForm
          handleCancel={() => setShowAddForm(false)}
          onSuccess={handleSuccess}
        />
      ) : (
        <ProviderCategory
          categories={categoryData || []} 
          loading={loading}             
          onAddButtonClick={handleOpenAddForm}
        />
      )}
    </div>
  );
};

export default ProviderPage;
