import React, { useState, useEffect } from 'react';
import BlackText from "../components/common/text/BlackText";
import Heading from "../components/common/text/Heading";
import NewsList from "../components/news/NewsList";
import NewsService from "../services/NewsService";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await NewsService.getAllNews();
                console.log("Fetched news data:", data); // Check the structure of your response
                setNews(data.data); // Ensure this matches the structure of your response
            } catch (err) {
                setError('Failed to fetch news.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <BlackText>Loading...</BlackText>;
    if (error) return <BlackText color="red">{error}</BlackText>;

    return (
        <div>
            <Heading variant="h1">Latest News</Heading>
            <NewsList news={news} />
        </div>
    );
};

export default NewsPage;
