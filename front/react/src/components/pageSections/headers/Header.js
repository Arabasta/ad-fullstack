import React from "react";
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";
import { Logo } from ""; // todo: replace with logo filepath

// todo: refactor later to use the button components

const Header = () => {
    const bg = useColorModeValue("white", "gray.800"); //todo: confirm color scheme
    const mobileNav = useDisclosure();

    return (

        <chakra.header
            bg={bg}
            w="full"
            px={{ base: 2, sm: 4 }}
            py={4}
            shadow="md"
        >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
                <Flex>
                    <chakra.a
                        href="/"
                        {/* todo: update the link */}
                        title="FourQuant HomePage"
                        display="flex"
                        alignItems="center"
                    >
                        <Logo />
                    </chakra.a>
                    <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                        FourQuant
                    </chakra.h1>
                </Flex>
                <HStack display="flex" alignItems="center" spacing={1}>
                    <HStack
                        spacing={1}
                        mr={1}
                        color="brand.500"
                        display={{ base: "none", md: "inline-flex" }}
                    >
                        <Button variant="ghost">Trade</Button>
                        <Button variant="ghost">Wallet</Button>
                        <Button variant="ghost">News</Button>
                        <Button variant="ghost">Profile</Button>
                        <Button variant="ghost">Sign in</Button>
                    </HStack>
                    <Button colorScheme="brand" size="sm">
                        Get Started
                    </Button>
                    <Box display={{ base: "inline-flex", md: "none" }}>
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            aria-label="Open menu"
                            fontSize="20px"
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            variant="ghost"
                            icon={<AiOutlineMenu />}
                            onClick={mobileNav.onOpen}
                        />

                        <VStack
                            pos="absolute"
                            top={0}
                            left={0}
                            right={0}
                            display={mobileNav.isOpen ? "flex" : "none"}
                            flexDirection="column"
                            p={2}
                            pb={4}
                            m={2}
                            bg={bg}
                            spacing={3}
                            rounded="sm"
                            shadow="sm"
                        >
                            <CloseButton
                                aria-label="Close menu"
                                onClick={mobileNav.onClose}
                            />

                            <Button w="full" variant="ghost">
                                Trade
                            </Button>
                            <Button w="full" variant="ghost">
                                Wallet
                            </Button>
                            <Button w="full" variant="ghost">
                                News
                            </Button>
                            <Button w="full" variant="ghost">
                                Profile
                            </Button>
                            <Button w="full" variant="ghost">
                                Sign in
                            </Button>
                        </VStack>
                    </Box>
                </HStack>
            </Flex>
        </chakra.header>
    );
};

export default Header;