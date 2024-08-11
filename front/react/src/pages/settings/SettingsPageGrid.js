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
                            Welcome,
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
                            Your optimal portfolio type:
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
                                Customize your profile to enhance your trading experience based on your unique investing style.
                            </SmallCardWithTextAndButton>
                            <SmallCardWithTextAndButton title="Bank Details" directToThisPath="/settings/profile/bankDetails">
                                Streamline your banking details with a unified interface, making management and reconciliation effortless.
                            </SmallCardWithTextAndButton>
                            <SmallCardWithTextAndButton title="Notifications" directToThisPath="/settings/notifications">
                                Stay informed with tailored notifications across your preferred channels, ensuring you never miss an update.
                            </SmallCardWithTextAndButton>
                        </Grid>
                    </GridItem>
                </Grid>
            </Box>
        </Flex>
    );
};

export default SettingPageGrid;
