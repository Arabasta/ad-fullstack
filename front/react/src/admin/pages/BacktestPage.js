import React from 'react';
import useBackTest from '../hooks/useBackTest';
import TickerList from '../component/TickerList';
import Heading from '../../components/common/text/Heading';
import ModalList from '../../components/common/modal/ModalList';
import ModalListItem from '../../components/common/modal/ModalListItem';
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
                <ModalList>
                    {algorithms.map((algo) => (
                        <ModalListItem key={algo}>
                            <BlackText>{algo}</BlackText>
                        </ModalListItem>
                    ))}
                </ModalList>
            </div>
            <TickerList tickerList={tickerList} portfolioTypes={portfolioTypes} />
        </div>
    );
};

export default BackTestPage;
