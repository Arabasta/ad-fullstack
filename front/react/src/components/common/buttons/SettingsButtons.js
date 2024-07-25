import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsButtons({ to, label }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button onClick={handleClick}>{label}</button>
    );
}
