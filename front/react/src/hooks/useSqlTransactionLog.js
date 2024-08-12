import {useState, useCallback, useEffect} from 'react';
import logService from '../services/SqlTransactionLogService';

// portfolio type is optional
// if type is wallet, calls getWalletTransactions
// if type is portfolio, calls getPortfolioTransactions
// processes response in the same way
const useSqlTransactionLog = (type, portfolioType = null) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const size = 10;

    const loadMoreTransactions = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            let response;
            if (type === 'wallet') {
                response = await logService.getWalletTransactions(page, size);
            } else if (type === 'portfolio' && portfolioType) {
                response = await logService.getPortfolioTransactions(portfolioType, page, size);
            } else if (type === 'trade') {
                response = await logService.getTradeTransactions(page, size);
            }
            const newTransactions = response.data.data.content;
            setTransactions((prev) => [...prev, ...newTransactions]);

            const isLastPage = response.data.data.last;
            if (isLastPage) {
                setHasMore(false); // No more transactions to load
            } else {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error loading transactions', error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page, type, portfolioType]);

    useEffect(() => {
        loadMoreTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { transactions, loadMoreTransactions, hasMore, loading };
};

export default useSqlTransactionLog;
