import React from 'react';
import { useLocation } from 'react-router-dom';

const BackTestResultPage = () => {
    const location = useLocation();
    const { labels, datasets } = location.state;

    return (
        <div>
            <h1>BackTest Result</h1>
            <h2>Capital</h2>
            <ul>
                {datasets[0].data.map((value, index) => (
                    <li key={index}>
                        {labels[index]}: {value}
                    </li>
                ))}
            </ul>
            <h2>Percent Change</h2>
            <ul>
                {datasets[1].data.map((value, index) => (
                    <li key={index}>
                        {labels[index]}: {value}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BackTestResultPage;
