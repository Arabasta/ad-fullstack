import React from 'react';
import EditFinancialProfileForm from "./EditFinancialProfileForm";
import useFinancialProfile from "../../../../hooks/useFinancialProfile";
import UpdateFinancialProfileService from "../../../../services/UpdateFinancialProfileService";

const EditFinancialProfile = () => {
    const { financialProfile, loading, error, getFinancialProfile } = useFinancialProfile();

    const handleUpdate = async (updatedProfile) => {
        try {
            await UpdateFinancialProfileService.updateFinancialProfile(updatedProfile);
            alert('Financial profile updated successfully!');
            getFinancialProfile(); // Refresh the profile after update
        } catch (error) {
            alert('Failed to update financial profile.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {financialProfile &&
            (<EditFinancialProfileForm financialProfile={financialProfile} onSubmit={handleUpdate}/>)
            }
        </div>
    );
};

export default EditFinancialProfile;