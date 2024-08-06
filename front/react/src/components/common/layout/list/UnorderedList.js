import { UnorderedList as ChakraUnorderedList } from '@chakra-ui/react';

const UnorderedList = (props) => (
    <ChakraUnorderedList
        styleType="none"
        m={0}
        p={0}
        {...props}
    />
);

export default UnorderedList;
