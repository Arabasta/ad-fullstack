import React from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftAddon,
    Input,
    Avatar,
    Icon,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from "react-icons/ri";

import Heading from "../../common/text/Heading";
import Text from "../../common/text/Text";
import Button from "../../common/buttons/Button";
const LoginForm = ({
                       username, setUsername,
                       password, setPassword,
                       method}) => {
    return (
        <Box
            bg="brand.400"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.100"
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
                                Login
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                Welcome back
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={method}
                            shadow="base"
                            rounded={[null, "md"]}
                            overflow={{ lg: "hidden" }}
                        >
                            <Stack
                                px={4}
                                py={8}
                                bg="white"
                                _dark={{ bg: "#141517" }}
                                spacing={6}
                                p={{ sm: 6 }}
                            >
                                <SimpleGrid columns={3} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Username
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <InputLeftAddon
                                                bg="brand.100"
                                                _dark={{ bg: "brand.100" }}
                                                color="gray.500"
                                                rounded="md"
                                            >
                                                <Avatar
                                                    boxSize={3}
                                                    bg="brand.100"
                                                    _dark={{ bg: "brand.100" }}
                                                    icon={
                                                        <Icon
                                                            as={FaUser}
                                                            boxSize={6}
                                                            mt={2}
                                                            rounded="full"
                                                            color="gray.700"
                                                            _dark={{ color: "gray.700" }}
                                                        />
                                                    }
                                                />
                                            </InputLeftAddon>
                                            <Input
                                                type="text"
                                                value={username}
                                                placeholder="Username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Password
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <InputLeftAddon
                                                bg="brand.100"
                                                _dark={{ bg: "brand.100" }}
                                                color="gray.500"
                                                rounded="md"
                                            >
                                                <Avatar
                                                    boxSize={3}
                                                    bg="brand.100"
                                                    _dark={{ bg: "brand.100" }}
                                                    icon={
                                                        <Icon
                                                            as={RiLockPasswordLine}
                                                            boxSize={6}
                                                            mt={2}
                                                            rounded="full"
                                                            color="gray.700"
                                                            _dark={{ color: "gray.700" }}
                                                        />
                                                    }
                                                />
                                            </InputLeftAddon>
                                            <Input
                                                type="password"
                                                value={password}
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                    </FormControl>
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
                                    type="submit"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Login
                                </Button>
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default LoginForm;
