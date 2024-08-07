import React from 'react';
import PropTypes from 'prop-types';
import NewsItem from "./NewsItem";


const NewsList = ({ news }) => {
    return (
        <div>
            {news.map((article, index) => (
                <NewsItem
                    key={index}
                    title={article.title}
                    description={article.description}
                    url={article.articleUrl} // Updated to match your DTO
                    author={article.author}
                    imageUrl={article.imageUrl}
                    publishedUtc={article.publishedUtc}
                />
            ))}
        </div>
    );
};

NewsList.propTypes = {
    news: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            articleUrl: PropTypes.string.isRequired, // Updated to match your DTO
            author: PropTypes.string,
            imageUrl: PropTypes.string,
            publishedUtc: PropTypes.string,
        })
    ).isRequired,
};

export default NewsList;
