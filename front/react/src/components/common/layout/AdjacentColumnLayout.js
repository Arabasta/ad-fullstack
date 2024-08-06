import React from 'react';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import Column from "./Column";

const AdjacentColumnLayout = ({columns}) => {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={20}
            w="auto"
            justifyContent="center"
            alignItems="center"
        >
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={5}
                px={{ base: 8, lg: 16, xl: 24 }}
                py={50}
                mx="auto"
                bg="white"
                _dark={{ bg: "gray.800" }}
                shadow="xl">

                {columns.map((column, index) => (
                    <Column key={index} title={column.title} icon={column.icon}>
                        {column.description}
                    </Column>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default AdjacentColumnLayout;
