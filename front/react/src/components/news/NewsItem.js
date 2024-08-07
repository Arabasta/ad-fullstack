import React from 'react';
import PropTypes from 'prop-types';
import Heading from "../common/text/Heading";
import BlackText from "../common/text/BlackText";

const NewsItem = ({ title, description, url, author, imageUrl, publishedUtc }) => {
    return (
        <div>
            <Heading variant="h3">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </Heading>
            <BlackText>{description}</BlackText>
            {author && <BlackText><strong>Author:</strong> {author}</BlackText>}
            {imageUrl && <img src={imageUrl} alt={title} />}
            {publishedUtc && <BlackText><strong>Published:</strong> {publishedUtc}</BlackText>}
        </div>
    );
};

NewsItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    publishedUtc: PropTypes.string,
};

export default NewsItem;
