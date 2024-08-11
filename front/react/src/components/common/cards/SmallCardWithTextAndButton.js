import {Box, chakra, Flex} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import Button from "../buttons/Button";
import React from "react";

const SmallCardWithTextAndButton = ({ title, children, directToThisPath }) => (
    <Flex>
        <Box ml={4}>
            <Link to={directToThisPath}>
                <Button
                    fontSize="lg"
                    fontWeight="bold"
                    lineHeight="6"
                    _light={{
                        color: "#eee",
                    }}
                >
                    {title}
                </Button>
            </Link>

            <chakra.dd
                mt={2}
                color="gray.500"
                _dark={{
                    color: "#eee",
                }}
            >
                {children}
            </chakra.dd>
        </Box>
    </Flex>
);

export default SmallCardWithTextAndButton;