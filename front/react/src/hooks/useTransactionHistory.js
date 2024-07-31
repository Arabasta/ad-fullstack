import { useState, useEffect, useCallback } from 'react';
import TransactionHistoryService from '../services/TransactionHistoryService';
import throttle from 'lodash.throttle';

const useTransactionHistory = (type, portfolioType = null) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const size = 10;

    const loadMoreTransactions = useCallback(
        throttle(async () => {
            if (loading || !hasMore) return;

            setLoading(true);

            try {
                let response;
                if (type === 'wallet') {
                    response = await TransactionHistoryService.getWalletTransactions(page, size);
                } else if (type === 'portfolio' && portfolioType) {
                    response = await TransactionHistoryService.getPortfolioTransactions(portfolioType, page, size);
                }

                const newTransactions = response.data.data;
                setTransactions((prev) => [...prev, ...newTransactions]);

                if (newTransactions.length < size) {
                    setHasMore(false); // No more transactions to load
                }

                setPage((prev) => prev + 1);
            } catch (error) {
                console.error('Error loading transactions', error);
            } finally {
                setLoading(false);
            }
        }, 3500), // throttle delay
        [loading, hasMore, page, type, portfolioType] // todo: temp removed size need to double check
    );

    useEffect(() => {
        loadMoreTransactions();
    }, [loadMoreTransactions]);

    return { transactions, loadMoreTransactions, hasMore, loading };
};

export default useTransactionHistory;
