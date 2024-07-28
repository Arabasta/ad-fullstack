import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../../assets/images/logo.svg';
import defaultUser from '../../assets/images/default-user.png';

const Links = ['NEWS', 'WALLET', 'SUPPORT', 'SETTINGS'];

const NavLink = ({ children, to }) => {
    return (
        <Box
            as={Link}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            to={to}
        >
            {children}
        </Box>
    );
};

export default function NavigationBarForWeb() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box as={Link} to="/">
                            <img src={logo} alt="Logo" className="logo" style={{ height: '40px' }} />
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link} to={`/${link.toLowerCase()}`}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                <Avatar
                                    size={'sm'}
                                    src={defaultUser}  // Use the default user login photo
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={Link} to="/profile">Profile</MenuItem>
                                <MenuItem as={Link} to="/settings">Settings</MenuItem>
                                <MenuDivider />
                                <MenuItem as={Link} to="/logout">Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link} to={`/${link.toLowerCase()}`}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

        </>
    );
}
