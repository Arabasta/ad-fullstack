import React from 'react';
import {Box, HStack} from "@chakra-ui/react";
import Text from "../common/text/Text";

const PortfolioDetails = ({ portfolio }) => {
    const allocatedBalance = portfolio.allocatedBalance;
    const currentValue = portfolio.currentValue;
    let percentageChange = (100 * (currentValue - allocatedBalance) / allocatedBalance).toFixed(2);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Box flex={1} direction="row">
            {(portfolio) ? (
                <HStack alignContent="center" flex={1} direction="row">
                    <Text color="black" fontSize="2xl" fontWeight="500">
                        {formatter.format(currentValue)}
                    </Text>
                    <Text color={percentageChange >= 0 ? "green.500" : "red.500"} fontSize="xl">
                        ({percentageChange}%)
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
