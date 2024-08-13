import React, { useContext, useEffect, useState } from "react";
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Logo } from "@choc-ui/logo";
import Button from '../buttons/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../config/context/AuthContext";

const Header = () => {
    const bg = useColorModeValue("white", "white");
    const mobileNav = useDisclosure();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrolledToBottom = currentScrollY + windowHeight >= pageHeight;

            if (scrolledToBottom) {
                // if scroll down(lowest position),will display navbar
                setShowHeader(true);
            } else if (currentScrollY > lastScrollY) {
                // scroll down, but not the lowest position , will not display navbar
                setShowHeader(false);
            } else {
                // scroll up display navbar
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <chakra.header
            bg={bg}
            w="full"
            px={{ base: 2, sm: 4 }}
            py={4}
            shadow="md"
            position="sticky"
            top={0}
            zIndex={10}
            transition="transform 0.3s ease"
            transform={showHeader ? 'translateY(0)' : 'translateY(-100%)'}
        >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
                <Flex>
                    <chakra.a
                        href="/"
                        title="FourQuant.ai Home Page"
                        display="flex"
                        alignItems="center"
                    >
                        <Logo />
                        <VisuallyHidden>FourQuant.ai</VisuallyHidden>
                    </chakra.a>
                    <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                        FourQuant.ai
                    </chakra.h1>
                </Flex>
                <HStack display="flex" alignItems="center" spacing={1}>
                    <HStack
                        spacing={1}
                        mr={1}
                        color="brand.100"
                        display={{ base: "none", md: "inline-flex" }}
                    >
                        <Link to="/news">
                            <Button variant="ghost">News</Button>
                        </Link>
                        <Link to="/support">
                            <Button variant="ghost">Support</Button>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/portfolio">
                                    <Button variant="ghost">Portfolio</Button>
                                </Link>
                                <Link to="/wallet">
                                    <Link to="/backtest">
                                        <Button variant="ghost">Backtest</Button>
                                    </Link>
                                    <Button variant="ghost">Wallet</Button>
                                </Link>
                                <Link to="/settings">
                                    <Button variant="ghost">Settings</Button>
                                </Link>
                                <Link to="/support">
                                    <Button w="full" variant="ghost">
                                        Support
                                    </Button>
                                </Link>
                                <Button onClick={logout}>Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost">Sign in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="ghost">Register</Button>
                                </Link>
                            </>
                        )}
                    </HStack>
                    {!isAuthenticated && (
                        <Link to="/register">
                            <Button colorScheme="brand" size="sm">
                                Get Started
                            </Button>
                        </Link>
                    )}
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

                            <Link to="/news">
                                <Button w="full" variant="ghost">
                                    News
                                </Button>
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Button w="full" variant="ghost">Portfolio</Button>
                                    <Link to="/wallet">
                                        <Button w="full" variant="ghost">
                                            Wallet
                                        </Button>
                                    </Link>
                                    <Link to="/profile">
                                        <Button w="full" variant="ghost">
                                            Profile
                                        </Button>
                                    </Link>
                                    <Link to="/support">
                                        <Button w="full" variant="ghost">
                                            Support
                                        </Button>
                                    </Link>
                                    <Button w="full" variant="ghost" onClick={logout}>Sign Out</Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button w="full" variant="ghost">
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button w="full" variant="ghost">
                                            Register
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button w="full" colorScheme="brand">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </VStack>
                    </Box>
                </HStack>
            </Flex>
        </chakra.header>
    );
};

export default Header;
