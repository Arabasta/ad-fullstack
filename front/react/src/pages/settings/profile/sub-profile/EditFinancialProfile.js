import React, { useState, useEffect } from 'react';
import EditFinancialProfileForm from "./EditFinancialProfileForm";
import useFinancialProfile from "../../../../hooks/useFinancialProfile";
import UpdateFinancialProfileService from "../../../../services/UpdateFinancialProfileService";

const EditFinancialProfile = () => {
    const { financialProfile, loading, error, getFinancialProfile } = useFinancialProfile();
    const [message, setMessage] = useState('');

    useEffect(() => {
        // 初次加载时获取数据
        getFinancialProfile();
    }, [getFinancialProfile]);

    const handleUpdate = async (updatedProfile) => {
        try {
            await UpdateFinancialProfileService.updateFinancialProfile(updatedProfile);
            setMessage('Financial profile updated successfully!');
            // 更新成功后重新获取最新的数据
            getFinancialProfile();
        } catch (error) {
            setMessage('Failed to update financial profile.');
            console.error('Error updating profile:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {financialProfile && (
                <EditFinancialProfileForm
                    financialProfile={financialProfile}
                    onSubmit={handleUpdate}
                />
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditFinancialProfile;
