import React from 'react';
import FreeFormField from "../../common/inputs/FreeFormField";

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
            <button type="submit">Next</button>
        </form>
    );
};

export default RegisterStep1;
