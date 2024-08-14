import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Text from '../common/text/Text';
import ButtonPrimary from '../common/button/ButtonPrimary';
import useSqlTransactionLog from "../../hooks/useSqlTransactionLog";

const TransactionHistoryList = ({ type, portfolioType }) => {
    const { transactions, loadMoreTransactions, hasMore, loading } = useSqlTransactionLog(type, portfolioType);

    const renderTransaction = ({ item }) => (
        <View style={styles.transaction}>
            <Text style={styles.transactionType}>{item.transactionType} ${item.transactionAmount.toLocaleString('en-SG')}</Text>
            <Text style={styles.transactionBalance}>Balance: ${item.totalAmount.toLocaleString('en-SG')}</Text>
            <Text style={styles.transactionTimestamp}>
                {Array.isArray(item.timestamp) && item.timestamp.length >= 6
                    ? new Date(item.timestamp[0], item.timestamp[1] - 1, item.timestamp[2], item.timestamp[3], item.timestamp[4], item.timestamp[5]).toLocaleString()
                    : "Invalid Date"}
            </Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
                ListFooterComponent={() => (
                    <View style={styles.footer}>
                        {loading && <ActivityIndicator size="large" />}
                        {!loading && hasMore && (
                            <ButtonPrimary title="Load More" onPress={loadMoreTransactions} style={styles.loadMoreButton} />
                        )}
                        {!hasMore && (
                            <Text style={styles.noMoreTransactions}>No more transactions to show</Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingBottom: 20,
    },
    transaction: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    transactionType: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    transactionBalance: {
        fontSize: 16,
    },
    transactionTimestamp: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    loadMoreButton: {
        marginTop: 10,
    },
    noMoreTransactions: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
});

export default TransactionHistoryList;
