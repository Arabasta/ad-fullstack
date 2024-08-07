import React from 'react';
import ProfileButtons from "../../../components/common/buttons/ProfileButtons";

const EditBankPage = () => {
    return (
        <div>
            <h2>Main Edit Bank</h2>
            <ProfileButtons to="/profile/bankDetails" label="Bank Details" />

        </div>
    );
};

export default EditBankPage;