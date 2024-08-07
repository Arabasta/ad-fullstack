import React from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    Stack,
} from '@chakra-ui/react';
import Heading from "../../../components/common/text/Heading";
import Text from "../../../components/common/text/Text";
import Button from "../../../components/common/buttons/Button";
import ProfileButtons from "../../../components/common/buttons/ProfileButtons";
import SmallCardWithTextAndButton from "../../../components/common/cards/SmallCardWithTextAndButton";

// todo: make button go back to home page

const ProfileMainPage = ({method}) => {
    return (
        <Box
            bg="brand.600"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.400"
                _dark={{ bg: "#111" }}
                p={30}
            >
                <SimpleGrid
                    display={{ base: "initial", md: "grid" }}
                    columns={{ md: 3 }}
                    spacing={{ md: 6 }}
                >

                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading color="brand.100" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Update
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                your details.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>

                            <Stack
                                px={4}
                                py={8}
                                bg="white"
                                _dark={{ bg: "#141517" }}
                                spacing={6}
                                p={{ sm: 6 }}
                            >
                                <SimpleGrid columns={3} spacing={6}>
                                    <GridItem colSpan={[3, 2]}>
                                        <ProfileButtons to="/profile/account" label="Email and Password" />
                                        <ProfileButtons to="/profile/update-mobile-number" label="Phone Number" />
                                        <ProfileButtons to="/profile/address" label="Address" />
                                        <ProfileButtons to="/profile/financialProfile" label="Financial Profile" />
                                        <ProfileButtons to="/profile/investorProfile" label="Investor Profile" />

                                        <SmallCardWithTextAndButton title="Email" directToThisPath="/settings/profile/user">
                                        </SmallCardWithTextAndButton>
                                        <SmallCardWithTextAndButton title="Change Password" directToThisPath="/settings/profile/password">
                                        </SmallCardWithTextAndButton>
                                        <SmallCardWithTextAndButton title="Address" directToThisPath="/settings/profile/address">
                                        </SmallCardWithTextAndButton>
                                        <SmallCardWithTextAndButton title="Financial Profile" directToThisPath="/settings/profile/financialProfile">
                                        </SmallCardWithTextAndButton>
                                        <SmallCardWithTextAndButton title="Investor Profile" directToThisPath="/settings/profile/investorProfile">
                                        </SmallCardWithTextAndButton>

                                    </GridItem>
                                </SimpleGrid>
                            </Stack>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="right"
                            >
                                <Button
                                    type="button"
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Return
                                </Button>
                            </Box>


                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default ProfileMainPage;