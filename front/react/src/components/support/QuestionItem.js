import React from 'react';
import PropTypes from 'prop-types';
import BlackText from '../../components/common/text/BlackText';
import Heading from '../../components/common/text/Heading';

const QuestionItem = ({ question, answer }) => {
    return (
        <div>
            <Heading variant="h4">{question}</Heading>
            <BlackText>{answer}</BlackText>
        </div>
    );
};

QuestionItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

export default QuestionItem;
