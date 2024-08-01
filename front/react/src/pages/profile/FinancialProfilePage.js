import React from 'react';
import useFinancialProfile from '../../hooks/useFinancialProfile';
import FinancialProfileForm from '../../components/form/FinancialProfileForm';
import UpdateFinancialProfileService from '../../services/UpdateFinancialProfileService';

/**
 * Page component to display and handle the update of the financial profile.
 */
const FinancialProfilePage = () => {
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
            <h2>Update Financial Profile</h2>
            {financialProfile && (
                <FinancialProfileForm financialProfile={financialProfile} onSubmit={handleUpdate} />
            )}
        </div>
    );
};

export default FinancialProfilePage;
