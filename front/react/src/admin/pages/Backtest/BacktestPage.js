import React, { useState } from 'react';
import useBackTest from '../../hooks/useBackTest';
import TickerList from '../../component/TickerList';
import Heading from '../../../components/common/text/Heading';
import UnorderedList from '../../../components/common/layout/list/UnorderedList';
import ListItem from '../../../components/common/layout/list/ListItem';
import BlackText from '../../../components/common/text/BlackText';
import BackTestService from '../../services/BackTestService';
import { useNavigate } from 'react-router-dom';

const BackTestPage = () => {
    const { algorithms, portfolioTypes, tickerList, loading, error } = useBackTest();
    const [selectedPortfolioType, setSelectedPortfolioType] = useState('');
    const [selectedAlgorithmType, setSelectedAlgorithmType] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedTicker] = useState(null);
    const navigate = useNavigate();

    const handlePortfolioTypeChange = (event) => {
        setSelectedPortfolioType(event.target.value);
    };

    const handleAlgorithmTypeChange = (event) => {
        setSelectedAlgorithmType(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleRunGlobalBackTest = async () => {
        if (selectedPortfolioType && selectedAlgorithmType && amount) {
            try {
                console.log('Running BackTest with:', {
                    portfolioType: selectedPortfolioType,
                    amount: amount,
                    algorithmType: selectedAlgorithmType,
                    ticker: selectedTicker
                });

                const response = await BackTestService.runBackTest(
                    selectedPortfolioType,
                    amount,
                    selectedAlgorithmType,
                    selectedTicker
                );
                navigate('/admin/backtest-result', { state: response.data.data });
            } catch (error) {
                console.error('Error running backtest', error);
            }
        } else {
            alert('Please select a portfolio type, algorithm type, and amount');
        }
    };

    return (
        <div>
            <Heading variant="h1">BackTest Page</Heading>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <div>
                <Heading variant="h2">Algorithms</Heading>
                <UnorderedList>
                    {algorithms.map((algo) => (
                        <ListItem key={algo}>
                            <BlackText>{algo}</BlackText>
                        </ListItem>
                    ))}
                </UnorderedList>
                <div>
                    <label>Select Portfolio Type:</label>
                    <select
                        value={selectedPortfolioType}
                        onChange={handlePortfolioTypeChange}
                    >
                        <option value="" disabled>Select Portfolio Type</option>
                        {portfolioTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Algorithm Type:</label>
                    <select
                        value={selectedAlgorithmType}
                        onChange={handleAlgorithmTypeChange}
                    >
                        <option value="" disabled>Select Algorithm Type</option>
                        {algorithms.map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                    />
                </div>
                <button onClick={handleRunGlobalBackTest}>Run Global BackTest</button>
            </div>
            <TickerList
                tickerList={tickerList}
                selectedPortfolioType={selectedPortfolioType}
                selectedAlgorithmType={selectedAlgorithmType}
                amount={amount}
            />
        </div>
    );
};

export default BackTestPage;
