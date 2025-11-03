import React, { useState } from "react";
import CreateProvidersForm from "../AddProviders";
import Providers from "../index";
import EditProviders from "../EditProviders";
import { useGetProviders } from "../../../../Hooks/useProviderName";

const ProvidersParent = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);
    const { providersData, loading, refetch } = useGetProviders();

    const handleOpenAddForm = () => {
        setEditingProvider(null);
        setShowAddForm(true);
    };

    const handleEditClick = (provider) => {
        setEditingProvider(provider);
        setShowAddForm(true);
    };

    const handleSuccess = () => {
        setShowAddForm(false);
        setEditingProvider(null);
        refetch();
    };

    return (
        <div>
            {showAddForm ? (
                editingProvider ? (
                    <EditProviders
                        providerData={editingProvider}
                        onUpdateSuccess={handleSuccess}
                        onCancel={() => {
                            setShowAddForm(false);
                            setEditingProvider(null);
                        }}
                    />
                ) : (
                    <CreateProvidersForm
                        handleCancel={() => {
                            setShowAddForm(false);
                        }}
                        onSuccess={handleSuccess}
                    />
                )
            ) : (
                <Providers
                    providers={providersData || []}
                    loading={loading}
                    onAddButtonClick={handleOpenAddForm}
                    onEditClick={handleEditClick}
                    onDeleteClick={refetch}
                />
            )}
        </div>

    );
};

export default ProvidersParent;
