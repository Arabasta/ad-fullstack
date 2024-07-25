import React from 'react';
import RegisterForm from '../../components/form/auth/RegisterForm';
import Text from '../../components/common/Text';

const RegisterPage = () => {
    return (
        <div>
            <Text variant="h2">Register</Text>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
