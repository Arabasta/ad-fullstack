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
    const navigate = useNavigate();

    const handlePortfolioTypeChange = (event) => {
        setSelectedPortfolioType(event.target.value);
    };

    const handleRunGlobalBackTest = async () => {
        if (selectedPortfolioType) {
            try {
                const response = await BackTestService.runBackTest(null, selectedPortfolioType); // ticker 为 null
                navigate('/admin/backtest-result', { state: response.data.data });
            } catch (error) {
                console.error('Error running backtest', error);
            }
        } else {
            alert('Please select a portfolio type');
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
                    <button onClick={handleRunGlobalBackTest}>Run Global BackTest</button>
                </div>
            </div>
            <TickerList tickerList={tickerList} selectedPortfolioType={selectedPortfolioType} />
        </div>
    );
};

export default BackTestPage;
