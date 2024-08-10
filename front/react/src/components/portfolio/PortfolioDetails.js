import React from 'react';
import {Box, HStack} from "@chakra-ui/react";
import Text from "../common/text/Text";

const PortfolioDetails = ({ portfolio }) => {
    return (
        <Box flex={1} direction="row">
            {portfolio !== null ? (
                <HStack alignContent="center" flex={1} direction="row" justifyContent="space-around">
                    <Text color="black" fontSize="2xl" fontWeight="500">
                        Current Value: ${portfolio.currentValue}
                    </Text>
                    <Text color="black" fontSize="2xl">
                        Allocated Balance: ${portfolio.allocatedBalance}
                    </Text>
                </HStack>
                ) : (
                <Box>
                    <Text color="black">Loading portfolio...</Text>
                </Box>
            )}
        </Box>
    );
};

export default PortfolioDetails;
