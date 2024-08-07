import React from 'react';
import PropTypes from 'prop-types';
import Heading from "../common/text/Heading";
import BlackText from "../common/text/BlackText";

const NewsItem = ({ title, url, author }) => {
    console.log("NewsItem props:", { title, url, author }); // Add console log to check the props
    return (
        <div>
            <Heading variant="h3">{title}</Heading>
            {author && <BlackText><strong>Author:</strong> {author}</BlackText>}
            <BlackText>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Read full article
                </a>
            </BlackText>
        </div>
    );
};

NewsItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
};

export default NewsItem;

