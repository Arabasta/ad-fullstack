import React from 'react';
import Header2 from "../components/pageSections/headers/Header2";
import ParagraphWithImageCard from "../components/elements/cards/ParagraphWithImageCard";
import Footer2 from "../components/pageSections/footers/Footer2";
//import Header from "../../components/pageSections/headers/Header";
//import Footer from "../../components/pageSections/footers/Footer";
//import logo from "../../assets/images/fourquantlogo.


const HomePage = () => {
    const navLinks = [
        { href: '#', label: 'Portfolio' },
        { href: '#', label: 'Wallet' },
        { href: '#', label: 'News' },
        { href: '#', label: 'Contact' },
    ];

    const footerLinks = [
        { href: '#', label: 'Support' },
        { href: '#', label: 'About Us' },
    ]

    const user = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
    };

    const socialLinks = [
        { href: '#', label: 'Facebook', icon: <i className="fab fa-facebook-f"></i> },
        { href: '#', label: 'Twitter', icon: <i className="fab fa-twitter"></i> },
        { href: '#', label: 'LinkedIn', icon: <i className="fab fa-linkedin-in"></i> },
    ];

    return (
        <div>
            <Header2 />
            <main>
                <ParagraphWithImageCard />
            </main>
            <Footer2 />

        </div>
    );
};

export default HomePage;
