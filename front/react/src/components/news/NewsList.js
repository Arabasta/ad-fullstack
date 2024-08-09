import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem } from '@chakra-ui/react';
import NewsItem from "./NewsItem";
import BlackText from "../common/text/BlackText";

const NewsList = ({ news }) => {
    console.log("NewsList props:", news);

    if (!Array.isArray(news)) {
        // Handle the case where news is not an array
        return <BlackText>No news available.</BlackText>;
    }

    return (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }} gap={8}>
            {news.map((article, index) => (
                <GridItem key={index} as="article">
                    <NewsItem
                        title={article.title}
                        url={article.article_url}
                        author={article.author}
                        description={article.description}
                        imageUrl={article.image_url}
                    />
                </GridItem>
            ))}
        </Grid>
    );
};

NewsList.propTypes = {
    news: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            article_url: PropTypes.string.isRequired,
            author: PropTypes.string,
            description: PropTypes.string,
            image_url: PropTypes.string,
        })
    ).isRequired,
};

export default NewsList;
