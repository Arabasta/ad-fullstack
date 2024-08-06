import { ListItem } from '@chakra-ui/react';

const ModalListItem = (props) => (
    <ListItem
        bg="gray.100"
        p="10px"
        mb="10px"
        borderRadius="5px"
        color={"black"}
        {...props}
    />
);

export default ModalListItem;
