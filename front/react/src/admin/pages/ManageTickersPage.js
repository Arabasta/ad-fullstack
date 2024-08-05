import React, {useState} from 'react';
import TickerList from "../component/tickers/TickerList";
import AvailableTickerList from "../component/tickers/AvailableTickerList";
import useTickers from "../hooks/useTickers";

const ManageTickersPage = () => {
    const {
        activeTickers,
        availableTickers,
        loading,
        fetchAvailableTickers,
        addTicker,
        deleteTicker
    } = useTickers();

    const [showAvailableTickers, setShowAvailableTickers] = useState(false);

    const handleAddButtonClick = () => {
        fetchAvailableTickers();
        setShowAvailableTickers(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Manage Tickers</h1>
            <button onClick={handleAddButtonClick}>Add Ticker</button>
            <h2>Active Tickers</h2>
            <TickerList tickers={activeTickers} onDelete={deleteTicker} />
            {showAvailableTickers && (
                <div>
                    <h2>Available Tickers</h2>
                    <AvailableTickerList tickers={availableTickers} onAdd={addTicker} />
                </div>
            )}
        </div>
    );
};

export default ManageTickersPage;