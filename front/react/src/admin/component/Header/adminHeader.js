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
import Button from "../../../components/common/buttons/Button";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../config/context/AuthContext";

const AdminHeader = () => {
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
                // 滚动到页面底部，显示导航栏
                setShowHeader(true);
            } else if (currentScrollY > lastScrollY) {
                // 向下滚动且未到底部时隐藏导航栏
                setShowHeader(false);
            } else {
                // 向上滚动时显示导航栏
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
                        {isAuthenticated ? (
                            <>
                                <Link to="/admin/managelivetrading">
                                    <Button variant="ghost">Live Trading</Button>
                                </Link>
                                <Link to="/backtest">
                                    <Button variant="ghost">Backtest</Button>
                                </Link>
                                <Link to="/admin/manage-user">
                                    <Button variant="ghost">Manage User</Button>
                                </Link>
                                <Link to="/admin/manage-tickers">
                                    <Button variant="ghost">Manage Tickers</Button>
                                </Link>
                                <Button onClick={logout}>Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/news">
                                    <Button variant="ghost">News</Button>
                                </Link>
                                <Link to="/support">
                                    <Button w="full" variant="ghost">
                                        Support
                                    </Button>
                                </Link>
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

                            {isAuthenticated ? (
                                <>
                                    <Link to="/admin/managelivetrading">
                                        <Button w="full" variant="ghost">Live Trading</Button>
                                    </Link>
                                    <Link to="/backtest">
                                        <Button w="full" variant="ghost">Backtest</Button>
                                    </Link>
                                    <Link to="/admin/manage-user">
                                        <Button w="full" variant="ghost">Manage User</Button>
                                    </Link>
                                    <Link to="/admin/manage-tickers">
                                        <Button w="full" variant="ghost">Manage Tickers</Button>
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

export default AdminHeader;
