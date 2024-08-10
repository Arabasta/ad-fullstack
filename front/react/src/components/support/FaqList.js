import React from 'react';
import QuestionItem from './QuestionItem';
import PropTypes from 'prop-types';
import { Accordion } from '@chakra-ui/react';

const FaqList = ({ faqs }) => {
    return (
        <Accordion allowMultiple>
            {faqs.map((faq, index) => (
                <QuestionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </Accordion>
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
