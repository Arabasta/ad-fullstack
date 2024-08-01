import React from 'react';
//import Header from "../../components/pageSections/headers/Header";
//import Footer from "../../components/pageSections/footers/Footer";
//import logo from "../../assets/images/fourquantlogo.jpg"
import Header2 from "../../components/pageSections/headers/Header2";
import Footer2 from "../../components/pageSections/footers/Footer2";

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
                <h2>Home</h2>
                <p>Welcome to the home page! For Test Only</p>
                <p>Todo: include some card element here</p>
            </main>
            <Footer2/>

        </div>
    );
};

export default HomePage;
