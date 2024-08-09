import React, { useState, useEffect } from 'react';
import {Flex, Spinner, Text, Container, Divider } from '@chakra-ui/react';
import Heading from "../components/common/text/Heading";
import NewsList from "../components/news/NewsList";
import newsService from "../services/NewsService";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsService.getAllNews();
                console.log('Fetched news data:', data); // Debugging log
                if (Array.isArray(data)) {
                    setNews(data);
                } else {
                    setNews([]);
                }
            } catch (err) {
                setError('Failed to fetch news.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return (
        <Flex justify="center" align="center" h="100vh">
            <Spinner size="xl" color="blue.500" />
        </Flex>
    );
    if (error) return (
        <Flex justify="center" align="center" h="100vh">
            <Text color="red.500" fontSize="xl">{error}</Text>
        </Flex>
    );

    return (
        <Container maxW="7xl" p={4}>
            <Heading variant="h1" textAlign="center" mb={4} color="blue.700">
                Breaking News and Insights
            </Heading>
            <Divider borderColor="blue.300" mb={8} />
            <NewsList news={news} />
        </Container>
    );
};

export default NewsPage;
