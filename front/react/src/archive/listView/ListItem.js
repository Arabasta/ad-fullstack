import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../components/common/text/Text';
import { formatTimestamp } from '../../utils/formatTimestamp';

const ListItem = ({ transaction }) => (
    <div style={styles.transactionItem}>
        <Text variant="p" style={styles.timestamp}>
            {formatTimestamp(transaction.timestamp)}
        </Text>
        <Text variant="p" style={styles.transactionDetail}>
            {transaction.type} - ${transaction.transactionAmount}
        </Text>
        <Text variant="p" style={styles.totalAmount}>
            Total Balance: ${transaction.totalAmount.toFixed(2)}
        </Text>
    </div>
);

ListItem.propTypes = {
    transaction: PropTypes.shape({
        timestamp: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        transactionAmount: PropTypes.number.isRequired,
        totalAmount: PropTypes.number.isRequired,
    }).isRequired,
};

const styles = {
    transactionItem: {
        padding: '10px 0',
    },
    timestamp: {
        margin: '0',
        fontSize: '14px',
        color: '#555',
    },
    transactionDetail: {
        margin: '5px 0 0 0',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        margin: '5px 0 0 0',
        fontSize: '14px',
        color: '#777',
    },
};

export default ListItem;
