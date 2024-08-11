import React from 'react';
import SettingsListItem from '../../components/settings/SettingsListItem';
import Container from '../../components/common/container/Container';

const ProfileScreen = ({ navigation }) => {
    return (
        <Container>
            <SettingsListItem onPress={() => navigation.navigate('ChangePassword')}>
                Change Password
            </SettingsListItem>
            <SettingsListItem onPress={() => navigation.navigate('Email')}>
                Email
            </SettingsListItem>
            <SettingsListItem onPress={() => navigation.navigate('Address')}>
                Address
            </SettingsListItem>
            <SettingsListItem onPress={() => navigation.navigate('FinancialProfile')}>
                Financial Profile
            </SettingsListItem>
            <SettingsListItem onPress={() => navigation.navigate('InvestorProfile')}>
                Investor Profile
            </SettingsListItem>
        </Container>
    );
};

export default ProfileScreen;
