import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';

// Function to generate a random color
function randomColor() {
    return Math.floor(Math.random() * 5);
}

// List of colors to choose from
const colorList = ['#E53E3E', '#38A169', '#00B5D8', '#44337A', '#ED64A6'];

const ProfileButtons = ({ to, label }) => {
    const navigate = useNavigate();
    const [colorCode, setColorCode] = useState(colorList[randomColor()]);

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Flex justifyContent="center" alignItems="center" p={4}>
            <Button
                px={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                    bg: useColorModeValue('#1a202c', '#2d3748'),
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
                onClick={handleClick}
            >
                {label}
            </Button>
        </Flex>
    );
};

ProfileButtons.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default ProfileButtons;
