import { ListItem as ChakraListItem } from '@chakra-ui/react';

const ListItem = (props) => (
    <ChakraListItem
        bg="gray.100"
        p="10px"
        mb="10px"
        borderRadius="5px"
        color={"black"}
        {...props}
    />
);

export default ListItem;
