import React, {useEffect, useState} from 'react';
import ParagraphWithImageCard from "../components/common/cards/ParagraphWithImageCard";
import {Flex} from "@chakra-ui/react";
import Button from "../components/common/buttons/Button";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InvestorProfileService from "../services/InvestorProfileService";

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isCustomer } = useAuth()
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState("")

    useEffect(() => {
        const fetchInvestorProfile = async () => {
            try {
                const response = await InvestorProfileService.getInvestorProfile();
                const profileData = response.data.data;
                setRecommendedPortfolioType(profileData.recommendedPortfolioType);
            } catch (error) {
                // todo: include catch error, refer to toast or something
            }
        };
        fetchInvestorProfile();
    }, []);

    const imageCardDetails = () => {
        if (!isAuthenticated) {
            return {
                title: "Turn Your Money into",
                subtitle: "Assets",
                description: "The secure way to buy, sell. Asking permission, not forgiveness. Millions use FourQuant.ai to diversify their portfolios.",
                button: <Button onClick={() => navigate(`/login/`)}>Learn More</Button>,
            }
        } else if (isCustomer) {
            return {
                title: "Start building your",
                subtitle: "Wealth",
                description: `You have been recommended the ${recommendedPortfolioType} portfolio. Join your fellow trailblazers and begin your journey at FourQuant.ai.`,
                button: <Button onClick={() => navigate(`/portfolio/`)}>View Portfolios</Button>,
            }
        } else {
            return {
                title: "Dive into the",
                subtitle: "Algorithms",
                description: "Perform Backtesting with exquisitely crafted Trading Algorithms. Discover new insights and soar to greater heights.",
                button: <Button onClick={() => navigate(`/admin/backtest/`)}>Start Backtesting</Button>,
            }
        }
    }

    return (
        <Flex direction={{base: "column",lg: "row"}}
              bg="brand.400"
              justifyContent="center"
              alignItems="center"
        >
            <ParagraphWithImageCard
                title={imageCardDetails().title}
                subtitle={imageCardDetails().subtitle}
                description={imageCardDetails().description}
                button={imageCardDetails().button}
                imageUrl="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&auto=format&fit=crop&w=750&q=80"
            />
        </Flex>
    );
};

export default HomePage;
