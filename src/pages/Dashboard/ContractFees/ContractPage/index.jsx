import React, { useState } from "react";
import CreateContractForm from "../AddContract";
import ContractFees from "../index";
import { useGetContract } from "../../../../Hooks/useContract";

const ContractPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const { contractData, loading, fetchContract } = useGetContract();

    const handleOpenAddForm = () => setShowAddForm(true);

    const handleSuccess = () => {
        setShowAddForm(false);
        fetchContract();
    };

    return (
        <div>
            {showAddForm ? (
                <CreateContractForm
                    handleCancel={() => setShowAddForm(false)}
                    onSuccess={handleSuccess}
                />
            ) : (
                <ContractFees
                    contract={contractData || []}
                    loading={loading}
                    onAddButtonClick={handleOpenAddForm}
                />
            )}
        </div>
    );
};

export default ContractPage;