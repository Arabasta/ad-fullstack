import React from 'react';
import Header from "../../components/pageSections/headers/Header";
import Footer from "../../components/pageSections/footers/Footer";

const HomePage = () => {
    const navLinks = [
        { href: '#', label: 'Home' },
        { href: '#', label: 'About' },
        { href: '#', label: 'Services' },
        { href: '#', label: 'Contact' },
    ];

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
            <Header logo="https://via.placeholder.com/150" navLinks={navLinks} user={user} />
            <main>
                <h2>Home</h2>
                <p>Welcome to the home page! For Test Only</p>
            </main>
            <Footer navLinks={navLinks} socialLinks={socialLinks} />
        </div>
    );
};

export default HomePage;
