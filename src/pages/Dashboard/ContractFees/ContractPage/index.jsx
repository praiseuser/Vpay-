import React, { useState } from "react";
import CreateContractForm from "../AddContract";
import UpdateContractForm from "../EditContract";
import ContractFees from "../index";
import { useGetContract } from "../../../../Hooks/useContract";

const ContractPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editContract, setEditContract] = useState(null); 

    const { contractData, loading, fetchContract } = useGetContract();

    const handleOpenAddForm = () => setShowAddForm(true);

    const handleEditContract = (contract) => {
        setEditContract(contract);
    };

    const handleSuccess = () => {
        setShowAddForm(false);
        setEditContract(null);
        fetchContract();
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setEditContract(null);
    };

    return (
        <div>
            {showAddForm ? (
                <CreateContractForm
                    handleCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            ) : editContract ? (
                <UpdateContractForm
                    contract={editContract}
                    handleCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            ) : (
                <ContractFees
                    contract={contractData || []}
                    loading={loading}
                    onAddButtonClick={handleOpenAddForm}
                    onEditButtonClick={handleEditContract}
                />
            )}
        </div>
    );
};

export default ContractPage;
