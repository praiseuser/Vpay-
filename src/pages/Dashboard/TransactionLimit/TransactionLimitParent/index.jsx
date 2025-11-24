import React, { useState } from "react";
import CreateTransactionLimitForm from "../AddTransactionLimit";
import EditTransactionLimitForm from "../EditTransactionLimit";
import TransactionLimit from "../index";
import { useGetTransactionLimit } from "../../../../Hooks/useTransactionLimit";

const TransactionLimitPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLimit, setEditingLimit] = useState(null);

  const {
    transactionLimitData: transactionLimits,
    loading,
    refetch,
  } = useGetTransactionLimit();

  const handleOpenAddForm = () => {
    setShowAddForm(true);
  };

  const handleEditClick = (limitData) => {
    setEditingLimit(limitData);
  };

  const handleSuccess = () => {
    setShowAddForm(false);
    setEditingLimit(null);
    refetch();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingLimit(null);
  };

  return (
    <div>
      {showAddForm ? (
        <CreateTransactionLimitForm
          handleCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      ) : editingLimit ? (
        <EditTransactionLimitForm
          limitData={editingLimit}
          handleCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      ) : (
        <TransactionLimit
          limits={transactionLimits || []}
          loading={loading}
          onAddButtonClick={handleOpenAddForm}
          onEditClick={handleEditClick}
          onDeleteClick={refetch}
        />
      )}
    </div>
  );
};

export default TransactionLimitPage;
