import React, { useState } from 'react';

const WalletPage = () => {
    const [data, setData] = useState(null);

    const handleButtonClick = async () => {
        try {
            const response = await fetch(' http://localhost:8080/api/v1/customer/wallet');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <h2>Wallet</h2>
            <p>Welcome to the Wallet page! For Test Only</p>
            <button onClick={handleButtonClick}>Fetch Data</button>
            {data && (
                <div>
                    <h3>data:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default WalletPage;
