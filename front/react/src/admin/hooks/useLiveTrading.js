import { useState } from 'react';
import LiveTradingService from "../services/LiveTradingService";

const useLiveTrading = () => {
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null); // 新增状态变量用于表示消息类型
    const [transactions, setTransactions] = useState(null);

    const startLiveTrading = async (portfolioType, tickerType) => {
        setMessage(null);
        setStatus(null);
        try {
            const response = await LiveTradingService.startLiveTrading(portfolioType, tickerType);
            setMessage(response.data.message);
            setStatus('success'); // 设置消息类型为成功
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage(err.message);
            }
            setStatus('error'); // 设置消息类型为错误
        }
    };

    const stopLiveTrading = async () => {
        setMessage(null);
        setStatus(null);
        try {
            const response = await LiveTradingService.stopLiveTrading();
            setMessage(response.data.message);
            setStatus('success'); // 设置消息类型为成功
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage(err.message);
            }
            setStatus('error'); // 设置消息类型为错误
        }
    };

    const getLiveTradingTransactions = async (portfolioType) => {
        setMessage(null);
        setStatus(null);
        try {
            const response = await LiveTradingService.getLiveTradingTransactions(portfolioType);
            setTransactions(response.data.data.content);
            setStatus('success'); // 设置消息类型为成功
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage(err.message);
            }
            setStatus('error'); // 设置消息类型为错误
        }
    };

    return {
        message,
        status, // 返回消息类型
        transactions,
        startLiveTrading,
        stopLiveTrading,
        getLiveTradingTransactions,
    };
};

export default useLiveTrading;
