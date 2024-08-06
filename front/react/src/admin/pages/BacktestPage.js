import React from 'react';
import useBackTest from '../hooks/useBackTest';
import TickerList from '../component/TickerList';
import Heading from '../../components/common/text/Heading';
import UnorderedList from '../../components/common/layout/list/UnorderedList';
import ListItem from '../../components/common/layout/list/ListItem';
import BlackText from '../../components/common/text/BlackText';

const BackTestPage = () => {
    const { algorithms, portfolioTypes, tickerList, loading, error } = useBackTest();

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
            </div>
            <TickerList tickerList={tickerList} portfolioTypes={portfolioTypes} />
        </div>
    );
};

export default BackTestPage;
