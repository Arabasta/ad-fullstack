import React from 'react';
import ParagraphWithImageCard from "../components/common/cards/ParagraphWithImageCard";
import {Flex} from "@chakra-ui/react";
import Button from "../components/common/buttons/Button";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isCustomer } = useAuth()

    const getStartedButton = () => {
        if (!isAuthenticated) {
            return <Button onClick={() => navigate(`/login/`)}>Get Started</Button>
        } else {
            return isCustomer ?
                (<Button onClick={() => navigate(`/portfolio/`)}>Get Started</Button>)
                :
                (<Button onClick={() => navigate(`/admin/backtest/`)}>Get Started</Button>)
        }
    }

    return (
        <Flex direction="row"
              bg="brand.400"
              justifyContent="center"
              alignItems="stretch"
        >
            <ParagraphWithImageCard
                title="Turn Your Money into"
                subtitle="Assets"
                description="The secure way to buy, sell. Asking permission,
                        not forgiveness. Millions use
                        FourQuant.ai to diversify
                        their portfolios."
                imageUrl="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&auto=format&fit=crop&w=750&q=80"
                button={getStartedButton()}
            />
        </Flex>
    );
};

export default HomePage;
