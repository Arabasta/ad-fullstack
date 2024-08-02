import React from 'react';
import {
    Flex,
    Box,
    chakra,
    Link,
} from '@chakra-ui/react'; // Make sure you have Chakra UI installed

const CardComponent = () => {
    return (
        <Flex
            bg="#edf3f8"
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                bg="white"
                mx={{
                    lg: 8,
                }}
                display={{
                    lg: "flex",
                }}
                maxW={{
                    lg: "5xl",
                }}
                shadow={{
                    lg: "lg",
                }}
                rounded={{
                    lg: "lg",
                }}
            >
                <Box
                    w={{
                        lg: "50%",
                    }}
                >
                    <Box
                        h={{
                            base: 64,
                            lg: "full",
                        }}
                        rounded={{
                            lg: "lg",
                        }}
                        bgSize="cover"
                        style={{
                            backgroundImage:
                                "url('https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&auto=format&fit=crop&w=750&q=80')",
                        }}
                    />
                </Box>

                <Box
                    py={12}
                    px={6}
                    maxW={{
                        base: "xl",
                        lg: "5xl",
                    }}
                    w={{
                        lg: "50%",
                    }}
                >
                    <chakra.h2
                        fontSize={{
                            base: "2xl",
                            md: "3xl",
                        }}
                        color="gray.800"
                        fontWeight="bold"
                    >
                        Turn Your Money into {" "}
                        <chakra.span
                            color="brand.600"
                        >
                            Assets
                        </chakra.span>
                    </chakra.h2>
                    <chakra.p
                        mt={4}
                        color="gray.600"
                    >
                        The secure way to buy, sell. Asking permission,
                        not forgiveness. Millions use
                        FourQuant.ai to diversify
                        their portfolios.
                    </chakra.p>

                    <Box mt={8}>
                        <Link
                            bg="gray.900"
                            color="gray.100"
                            px={5}
                            py={3}
                            fontWeight="semibold"
                            rounded="lg"
                            _hover={{
                                bg: "gray.800",
                            }}
                        >
                            Start Now
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default CardComponent;
