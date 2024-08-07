import React from 'react';
import QuestionItem from './QuestionItem';
import PropTypes from 'prop-types';

const FaqList = ({ faqs }) => {
    return (
        <div>
            {faqs.map((faq, index) => (
                <QuestionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

FaqList.propTypes = {
    faqs: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            answer: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default FaqList;
