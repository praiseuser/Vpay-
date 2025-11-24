import React, { useState } from "react";
import { useGetContract } from "../../../../Hooks/useContract";
import CreateContractTokenForm from "../AddContractToken";
import UpdateContractTokenForm from "../EditContractToken";
import ContractToken from "..";

const ContractTokenPage = () => {
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
                <CreateContractTokenForm
                    handleCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            ) : editContract ? (
                <UpdateContractTokenForm
                    contract={editContract}
                    handleCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            ) : (
                <ContractToken
                    contract={contractData || []}
                    loading={loading}
                    onAddButtonClick={handleOpenAddForm}
                    onEditButtonClick={handleEditContract}
                />
            )}
        </div>
    );
};

export default ContractTokenPage;
