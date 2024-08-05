import React, {useState} from 'react';
import useTickers from "../hooks/useTickers";
import TickerList from "../component/tickers/TickerList";
import AvailableTickerList from "../component/tickers/AvailableTickerList";


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

    const handleAddButtonClick = async () => {
        if (!showAvailableTickers) {
            await fetchAvailableTickers();
        }
        setShowAvailableTickers(!showAvailableTickers);
    };

    const handleAddTicker = async (ticker) => {
        await addTicker(ticker);
        setShowAvailableTickers(false); // Optionally hide the available tickers list after adding
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Manage Tickers</h1>
            <button onClick={handleAddButtonClick}>
                {showAvailableTickers ? 'Hide Available Tickers' : 'Add Ticker'}
            </button>
            <h2>Active Tickers</h2>
            <TickerList tickers={activeTickers} onDelete={deleteTicker} />
            {showAvailableTickers && (
                <div>
                    <h2>Available Tickers</h2>
                    <AvailableTickerList tickers={availableTickers} onAdd={handleAddTicker} />
                </div>
            )}
        </div>
    );
};

export default ManageTickersPage;