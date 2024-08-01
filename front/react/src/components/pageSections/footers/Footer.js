import React from "react";
import {
    Box,
    Flex,
    HStack,
    Link,
    Stack,
    Text,
    VStack,
    Divider,
    Icon,
} from "@chakra-ui/react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { Logo } from ""; // todo: replace with logo filepath

const Footer = () => {
    return (
        <Box bg="white" _dark={{ bg: "gray.600" }}>
            <Stack
                direction={{ base: "column", lg: "row" }}
                w="full"
                justify="space-between"
                p={10}
            >
                <Flex justify="center">
                    <Logo/>
                </Flex>
                <HStack
                    alignItems="start"
                    flex={1}
                    justify="space-around"
                    fontSize={{ base: "12px", md: "16px" }}
                    color="gray.800"
                    _dark={{ color: "white" }}
                    textAlign={{ base: "center", md: "left" }}
                >
                    <Flex justify="start" direction="column">
                        <Link textTransform="uppercase">Settings</Link>
                        <Link textTransform="uppercase">Support Center</Link>
                    </Flex>
                    <Flex justify="start" direction="column">
                        <Link textTransform="uppercase">Portfolio</Link>
                        <Link textTransform="uppercase">Wallet</Link>
                    </Flex>
                </HStack>
                <HStack
                    alignItems="start"
                    flex={1}
                    justify="space-around"
                    fontSize={{ base: "12px", md: "16px" }}
                    color="gray.800"
                    _dark={{ color: "white" }}
                    textAlign={{ base: "center", md: "left" }}
                >
                    <Flex justify="start" direction="column">
                        <Link textTransform="uppercase">Marketplace and Fees</Link>
                        <Link textTransform="uppercase">Privacy Policy</Link>
                        <Link textTransform="uppercase">User Agreement</Link>
                    </Flex>
                    <Flex justify="start" direction="column">
                        <Link textTransform="uppercase">About Us</Link>
                        <Link textTransform="uppercase">Contact Us</Link>
                        <Link textTransform="uppercase">Resources</Link>
                    </Flex>
                </HStack>
            </Stack>
            <Divider
                w="95%"
                mx="auto"
                color="gray.600"
                _dark={{ color: "#F9FAFB" }}
                h="3.5px"
            />
            <VStack py={3}>
                <HStack justify="center">
                    <Link href="#" aria-label="Facebook">
                        <Icon
                            color="gray.800"
                            _dark={{ color: "white" }}
                            h="20px"
                            w="20px"
                            as={FaFacebookF}
                        />
                    </Link>
                    <Link href="#" aria-label="Twitter">
                        <Icon
                            color="gray.800"
                            _dark={{ color: "white" }}
                            h="20px"
                            w="20px"
                            as={FiTwitter}
                        />
                    </Link>
                    <Link href="#" aria-label="Instagram">
                        <Icon
                            color="gray.800"
                            _dark={{ color: "white" }}
                            h="20px"
                            w="20px"
                            as={GrInstagram}
                        />
                    </Link>
                    <Link href="#" aria-label="LinkedIn">
                        <Icon
                            color="gray.800"
                            _dark={{ color: "white" }}
                            h="20px"
                            w="20px"
                            as={FaLinkedinIn}
                        />
                    </Link>
                </HStack>
                <Text textAlign="center" fontSize="smaller" _dark={{ color: "white" }}>
                    &copy; {new Date().getFullYear()} Company Name. All rights reserved.
                </Text>
            </VStack>
        </Box>
    );
};

export default Footer;
