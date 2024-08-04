import React from 'react';
import FreeFormField from "../inputFields/FreeFormField";
import {Button} from "@chakra-ui/react";

const RegisterStep1 = ({ email, setEmail, username, setUsername, password, setPassword, handleNext }) => {
    return (
        <form onSubmit={handleNext}>
            <FreeFormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <FreeFormField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <FreeFormField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="solid" colorScheme="blue" size="md">
                Next
            </Button>
        </form>
    );
};

export default RegisterStep1;

