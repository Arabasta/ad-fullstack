import React from 'react';
import {
    Box,
    Grid,
    GridItem,
    chakra,
    Flex
} from '@chakra-ui/react';
import SmallCardWithTextAndButton from "../../components/common/cards/SmallCardWithTextAndButton";

const SettingPageGrid = ({ customer, portfolioType = "Not available" }) => {
    if (!customer) {
        return "Not available";
    }

    return (
        <Flex
            bg="brand.400"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={{ base: 10, md: 20 }}
            w="full"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                shadow="xl"
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                px={{ base: 6, md: 8 }}
                py={{ base: 10, md: 20 }}
                mx="auto"
                borderRadius="md"
            >
                <Grid
                    templateColumns={{
                        base: "1fr",
                        md: "1fr 1fr 1fr",
                    }}
                    gap={{
                        base: 10,
                        lg: 24,
                    }}
                >
                    <Box>
                        <chakra.h2
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="semibold"
                            textTransform="uppercase"
                            letterSpacing="wide"
                            color="brand.500"
                        >
                            Good Morning,
                        </chakra.h2>
                        <chakra.h2
                            mb={3}
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="extrabold"
                            textAlign="left"
                            color="black"
                            lineHeight="shorter"
                            letterSpacing="tight"
                        >
                            {customer.firstName}
                        </chakra.h2>
                        <chakra.p
                            mb={6}
                            fontSize={{ base: "lg", md: "xl" }}
                            color="gray.600"
                            _dark={{ color: "gray.500" }}
                        >
                            Your recommended portfolio type:
                        </chakra.p>
                        <chakra.h2
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="semibold"
                            textTransform="uppercase"
                            letterSpacing="wide"
                            color="brand.500"
                        >
                            {portfolioType}
                        </chakra.h2>
                    </Box>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Grid
                            templateColumns={{
                                base: "1fr",
                                md: "1fr 1fr",
                            }}
                            gap={8}
                        >
                            <SmallCardWithTextAndButton title="Profile" directToThisPath="/settings/profile">
                                Let us know more about you to better tailor the trading experience according to your investing persona.
                            </SmallCardWithTextAndButton>
                            <SmallCardWithTextAndButton title="Bank Details" directToThisPath="/settings/profile/bankDetails">
                                Manage all your banking details in one place with a single integration, simplifying reporting and reconciliation.
                            </SmallCardWithTextAndButton>
                            <SmallCardWithTextAndButton title="Notifications" directToThisPath="/settings/notifications">
                                Provide a seamless customer experience across channels, like receiving updates through email.
                            </SmallCardWithTextAndButton>
                        </Grid>
                    </GridItem>
                </Grid>
            </Box>
        </Flex>
    );
};

export default SettingPageGrid;
