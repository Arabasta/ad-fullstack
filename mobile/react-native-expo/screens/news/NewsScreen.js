import React, { useState, useEffect } from 'react';
import NewsList from '../../components/news/NewsList';
import newsService from '../../services/NewsService';
import {ActivityIndicator, TextComponent, View} from "react-native";
import {Button} from "react-native-paper";
import Text from "../../components/common/text/Text";

const NewsScreen = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchNews = async () => {
        setLoading(true);
        setError(''); // Clear any previous errors
        try {
            const data = await newsService.getAllNews();
            console.log('Fetched news data:', data);
            setNews(data);
        } catch (err) {
            setError('Failed to fetch news. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <ActivityIndicator size="large" />;

    if (error) return (
        <View>
            <Text>{error}</Text>
            <Button title="Retry" onPress={fetchNews} />
        </View>
    );

    return (
        <View>
            <Text>Breaking News and Insights</Text>
            <NewsList news={news} />
        </View>
    );
};

export default NewsScreen;
