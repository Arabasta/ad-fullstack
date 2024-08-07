import React from 'react';
import ProfileButtons from "../../../components/common/buttons/ProfileButtons";

const EditNotificationsPage = () => {
    return (
        <div>
            <h2>Main Edit Notifications</h2>
            <ProfileButtons to="/profile/notification" label="Notifications" />
        </div>
    );
};

export default EditNotificationsPage;