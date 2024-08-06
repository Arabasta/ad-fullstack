import React from 'react';
import FaqList from './FaqList';
import Heading from "../common/text/Heading";

const faqs = [
    {
        question: "What is FourQuant.ai?",
        answer: "FourQuant.ai is an advanced robo-trading platform that leverages AI and machine learning to optimize and automate your trading strategies."
    },
    {
        question: "How do I create an account on FourQuant.ai?",
        answer: "To create an account, click on the 'Sign Up' button on our homepage, fill in your personal details, and follow the instructions to verify your email."
    },
    {
        question: "How does the robo-trading algorithm work?",
        answer: "Our robo-trading algorithm analyzes market data in real-time, identifies trading opportunities based on predefined strategies, and executes trades automatically."
    },
    {
        question: "How do I withdraw my funds?",
        answer: "To withdraw funds, log in to your account, navigate to the 'Wallet' section, and follow the instructions to transfer funds to your linked bank account."
    },
    {
        question: "What are the fees associated with using FourQuant.ai?",
        answer: "We charge a small percentage of the profits made from trades executed by our algorithms. Specific details can be found in the pricing section of our website."
    },
    {
        question: "Can I use FourQuant.ai on my mobile device?",
        answer: "Yes, FourQuant.ai is accessible via our mobile app, available for both iOS and Android devices."
    },
    {
        question: "How do I contact customer support?",
        answer: "For any inquiries or issues, you can contact our customer support team via the 'Contact Us' page on our website or through the live chat feature."
    },
    {
        question: "What is the minimum deposit required to start trading?",
        answer: "The minimum deposit required varies depending on the account type. Please refer to our account types section for specific details."
    },
    {
        question: "How can I update my account information?",
        answer: "To update your account information, log in to your account, go to the 'Profile' section, and edit the necessary details."
    },
    {
        question: "Are there any restrictions on the markets or assets I can trade?",
        answer: "FourQuant.ai supports trading in various markets and assets including stocks, forex, and cryptocurrencies. Specific restrictions may apply depending on your account type and location."
    },
    {
        question: "What happens if there is a technical issue during a trade?",
        answer: "In the unlikely event of a technical issue, our system is designed to fail-safe, ensuring that your funds are protected. Please contact customer support immediately for assistance."
    }
];

const Faq = () => {
    return (
        <div>
            <Heading variant="h1">Frequently Asked Questions</Heading>
            <FaqList faqs={faqs} />
        </div>
    );
}

export default Faq;
