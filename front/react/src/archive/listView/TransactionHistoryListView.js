import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListItem from './ListItem';
import SeparatorBlack from '../../components/common/layout/SeparatorBlack';

const TransactionHistoryListView = ({ transactions, loadMoreTransactions, hasMore }) => {
    return (
        <div id="scrollableDiv" style={styles.scrollableContainer}>
            <InfiniteScroll
                dataLength={transactions.length}
                next={loadMoreTransactions}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more transactions to load</b>
                    </p>
                }
                scrollableTarget="scrollableDiv"
            >
                {transactions.map((transaction, index) => (
                    <div key={index}>
                        <ListItem transaction={transaction} />
                        <SeparatorBlack />
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

const styles = {
    scrollableContainer: {
        height: '80vh', // Example height for scrollable area
        overflow: 'auto',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
};

export default TransactionHistoryListView;
