import React from 'react';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Flex,
    chakra,
    Icon
} from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const QuestionItem = ({ question, answer }) => {
    return (
        <AccordionItem borderColor="gray.200">
            {({ isExpanded }) => (
                <>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <Flex alignItems="center" minH={12}>
                                <Box>
                                    <chakra.dt
                                        fontSize="lg"
                                        fontWeight="medium"
                                        lineHeight="6"
                                        color="gray.900"
                                    >
                                        {question}
                                    </chakra.dt>
                                </Box>
                            </Flex>
                        </Box>
                        {isExpanded ? (
                            <Icon as={MinusIcon} fontSize="12px" />
                        ) : (
                            <Icon as={AddIcon} fontSize="12px" />
                        )}
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <chakra.dd mt={2} color="gray.500">
                            {answer}
                        </chakra.dd>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
};

QuestionItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

export default QuestionItem;
