import React from 'react';
import useBackTest from "../hooks/useBackTest";
import TickerList from "../component/TickerList";

const BackTestPage = () => {
    const { algorithms, portfolioTypes, tickerList, loading, error } = useBackTest();

    return (
        <div>
            <h1>BackTest Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <div>
                <h2>Algorithms</h2>
                <ul>
                    {algorithms.map((algo) => (
                        <li key={algo}>{algo}</li>
                    ))}
                </ul>
            </div>
            <TickerList tickerList={tickerList} portfolioTypes={portfolioTypes} />
        </div>
    );
};

export default BackTestPage;
