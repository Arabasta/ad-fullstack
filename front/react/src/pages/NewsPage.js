import React, { useState, useEffect } from 'react';
import { Flex, Spinner, Text, Container, Divider, Box } from '@chakra-ui/react';
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
        <Flex justify="center" align="center" h="100vh" bg="brand.400" _dark={{ bg: "#111" }}>
            <Spinner size="xl" color="brand.500" />
        </Flex>
    );
    if (error) return (
        <Flex justify="center" align="center" h="100vh" bg="brand.400" _dark={{ bg: "#111" }}>
            <Text color="red.500" fontSize="xl">{error}</Text>
        </Flex>
    );

    return (
        <Flex
            bg="brand.400"
            _dark={{ bg: "#111" }}
            p={10}
            justifyContent="center"
            alignItems="center"
            w="full"
        >
            <Box
                shadow="xl"
                bg="white"
                _dark={{ bg: "gray.800" }}
                px={{ base: 6, md: 8 }}
                py={{ base: 10, md: 20 }}
                mx="auto"
                borderRadius="md"
                w="100%"
            >
                <Container maxW="7xl" p={4}>
                    <Heading variant="h1" textAlign="center" mb={4} color="brand.500">
                        Breaking News and Insights
                    </Heading>
                    <Divider borderColor="brand.300" mb={8} />
                    <NewsList news={news} />
                </Container>
            </Box>
        </Flex>
    );
};

export default NewsPage;
