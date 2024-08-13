import React, { useState, useEffect } from 'react';
import {FlatList, ActivityIndicator, StyleSheet, View} from 'react-native';
import Container from "../../components/common/container/Container";
import Text from "../../components/common/text/Text";
import NewsService from "../../services/NewsService";
import NewsItem from "../../components/news/NewsItem";

const NewsScreen = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await NewsService.getAllNews();
                setNews(newsData);
            } catch (err) {
                setError('Failed to load news.');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <Container>
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading...</Text>
                </View>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <View style={styles.centeredContainer}>
                    <Text>{error}</Text>
                </View>
            </Container>
        );
    }
    return (
        <Container>
            <FlatList
                data={news}
                renderItem={({ item }) => <NewsItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default NewsScreen;
