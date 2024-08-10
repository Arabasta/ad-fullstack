import React from 'react';
import useTickers from '../hooks/useTickers';

const ManageTickersPage = () => {
    const {
        activeTickers,
        availableTickers,
        loading,
        addTicker,
        deleteTicker
    } = useTickers();

    const handleDragStart = (e, ticker) => {
        e.dataTransfer.setData("ticker", JSON.stringify(ticker));
    };

    const handleDrop = (e) => {
        const ticker = JSON.parse(e.dataTransfer.getData("ticker"));
        addTicker(ticker);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Manage Tickers</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>Available Tickers</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ticker Name</th>
                            <th>Ticker Type</th>
                            <th>Portfolio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {availableTickers.map(ticker => (
                            <tr key={ticker.id} draggable onDragStart={(e) => handleDragStart(e, ticker)}>
                                <td>{ticker.id}</td>
                                <td>{ticker.tickerName}</td>
                                <td>{ticker.tickerType}</td>
                                <td>{ticker.portfolioType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ minHeight: '200px', minWidth: '200px', border: '1px solid black' }}
                >
                    <h2>Active Tickers</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ticker Name</th>
                            <th>Ticker Type</th>
                            <th>Portfolio</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {activeTickers.map(ticker => (
                            <tr key={ticker.id}>
                                <td>{ticker.id}</td>
                                <td>{ticker.tickerName}</td>
                                <td>{ticker.tickerType}</td>
                                <td>{ticker.portfolioType}</td>
                                <td>
                                    <button onClick={() => deleteTicker(ticker.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );
};

export default ManageTickersPage;
