import React, { useState } from "react";
import CreateFaqForm from "../AddFaq";
import EditFaq from "../EditFaq";
import Faq from "../index";
import { useGetFaq } from "../../../../Hooks/useFaq";

const FaqPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editFaqData, setEditFaqData] = useState(null);

  const { faqData, loading, refetch } = useGetFaq();

  const handleOpenAddForm = () => setShowAddForm(true);
  const handleOpenEditForm = (faq) => setEditFaqData(faq);

  const handleSuccess = () => {
    setShowAddForm(false);
    setEditFaqData(null);
    refetch();
  };

  return (
    <div>
      {showAddForm ? (
        <CreateFaqForm
          handleCancel={() => setShowAddForm(false)}
          onSuccess={handleSuccess}
        />
      ) : editFaqData ? (
        <EditFaq
          faqData={editFaqData}
          onCancel={() => setEditFaqData(null)}
          onUpdateSuccess={handleSuccess}
        />
      ) : (
        <Faq
          faqs={faqData || []}
          loading={loading}
          onAddButtonClick={handleOpenAddForm}
          onEditClick={handleOpenEditForm}
          onDeleteSuccess={refetch}
        />
      )}
    </div>
  );
};

export default FaqPage;
