import React, { useState } from 'react';
import useTickers from '../hooks/useTickers';
import TickerList from '../component/tickers/TickerList';
import AvailableTickerList from '../component/tickers/AvailableTickerList';
import Heading from '../../components/common/text/Heading';
import Button from '../../components/common/buttons/Button';
import BlackText from '../../components/common/text/BlackText';
import UserMessage from "../../components/common/alerts/UserMessage";

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
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddButtonClick = async () => {
        if (!showAvailableTickers) {
            await fetchAvailableTickers();
        }
        setShowAvailableTickers(!showAvailableTickers);
    };

    const handleAddTicker = async (ticker) => {
        try {
            await addTicker(ticker);
            setShowAvailableTickers(false); // Optionally hide the available tickers list after adding
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            setErrorMessage('Failed to add ticker. Please try again.');
            console.error('Error adding ticker:', error);
        }
    };

    if (loading) return <BlackText>Loading...</BlackText>;

    return (
        <div>
            <Heading variant="h1">Manage Tickers</Heading>
            <Button onClick={handleAddButtonClick}>
                {showAvailableTickers ? 'Hide Available Tickers' : 'Add Ticker'}
            </Button>
            <Heading variant="h2">Active Tickers</Heading>
            <TickerList tickers={activeTickers} onDelete={deleteTicker} />
            {showAvailableTickers && (
                <div>
                    <Heading variant="h2">Available Tickers</Heading>
                    <AvailableTickerList tickers={availableTickers} onAdd={handleAddTicker} />
                </div>
            )}
            {errorMessage && <UserMessage message={errorMessage} />}
        </div>
    );
};

export default ManageTickersPage;
