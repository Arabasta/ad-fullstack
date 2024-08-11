import { Flex, Box, chakra, Stack } from "@chakra-ui/react";

const CallToActionSection = ({ title, subtitle, children }) => {
    return (
        <Flex
            bg="brand.400"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                justify="center"
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                w="full"
            >
                <Box
                    w={{
                        base: "full",
                        md: "75%",
                        lg: "50%",
                    }}
                    px={4}
                    py={20}
                    textAlign={{
                        base: "left",
                        md: "center",
                    }}
                >
                    <chakra.span
                        fontSize={{
                            base: "3xl",
                            sm: "4xl",
                        }}
                        fontWeight="extrabold"
                        letterSpacing="tight"
                        lineHeight="shorter"
                        color="gray.900"
                        _dark={{
                            color: "gray.100",
                        }}
                        mb={6}
                    >
                        <chakra.span display="block">{title}</chakra.span>
                        <chakra.span
                            display="block"
                            color="brand.600"
                            _dark={{
                                color: "gray.500",
                            }}
                        >
                            {subtitle}
                        </chakra.span>
                    </chakra.span>
                    <Stack
                        justifyContent={{
                            base: "left",
                            md: "center",
                        }}
                        direction={{
                            base: "column",
                            sm: "row",
                        }}
                        spacing={2}
                        mt={2}
                    >
                        {children}
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
};

export default CallToActionSection;
