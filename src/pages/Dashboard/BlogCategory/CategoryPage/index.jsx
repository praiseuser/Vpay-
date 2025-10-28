import React, { useState } from "react";
import BlogCategory from "../index";
import CreateCategoryForm from "../AddCategory";
import EditCategory from "../EditCategory";
import { useGetCategory } from "../../../../Hooks/useBlogCategory";

const CategoryPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categoryData, loading, fetchCategories } = useGetCategory();

  const handleOpenAddForm = () => setShowAddForm(true);
  const handleSuccess = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    fetchCategories();
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setShowEditForm(true);
  };

  return (
    <div>
      {showAddForm ? (
        <CreateCategoryForm
          handleCancel={() => setShowAddForm(false)}
          onSuccess={handleSuccess}
        />
      ) : showEditForm ? (
        <EditCategory
          categoryData={selectedCategory}
          onCancel={() => setShowEditForm(false)}
          onUpdateSuccess={handleSuccess}
        />

      ) : (
        <BlogCategory
          categories={categoryData || []}
          loading={loading}
          onAddButtonClick={handleOpenAddForm}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default CategoryPage;
