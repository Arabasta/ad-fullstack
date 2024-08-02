import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';


const ProfileButtons = ({ to, label }) => {
    const navigate = useNavigate();
    //const [colorCode, setColorCode] = useState(colorList[randomColor()]);

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
