import {Box, chakra, Flex, Icon} from "@chakra-ui/react";
import {FaCheck} from "react-icons/fa";
import {Link} from "react-router-dom";
import Button from "../buttons/Button";
import React from "react";

const SmallCardWithTextAndButton = ({ title, children, directToThisPath }) => (
    <Flex>
        <Flex shrink={0}>
            <Icon
                boxSize={5}
                mt={1}
                mr={2}
                color="brand.500"
                _dark={{
                    color: "brand.300",
                }}
                viewBox="0 0 20 20"
                fill="currentColor"
                as={FaCheck}
            />
        </Flex>
        <Box ml={4}>
            <Link to={directToThisPath}>
                <Button
                    fontSize="lg"
                    fontWeight="bold"
                    lineHeight="6"
                    _light={{
                        color: "gray.900",
                    }}
                >
                    {title}
                </Button>
            </Link>

            <chakra.dd
                mt={2}
                color="gray.500"
                _dark={{
                    color: "gray.400",
                }}
            >
                {children}
            </chakra.dd>
        </Box>
    </Flex>
);

export default SmallCardWithTextAndButton;