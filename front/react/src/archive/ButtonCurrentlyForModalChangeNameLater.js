import { Button } from '@chakra-ui/react';

// todo: currently unused, for reference only
const ButtonCurrentlyForModalChangeNameLater = ({ children, ...props }) => (
    <Button
        bg="black"
        color="white"
        borderRadius="5px"
        w="20%"
        mt="10px"
        _hover={{ bg: "#2d2e30" }}
        {...props}
    >
        {children}
    </Button>
);

export default ButtonCurrentlyForModalChangeNameLater;
