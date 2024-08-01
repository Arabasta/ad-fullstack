import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ navLinks, socialLinks }) => {
    return (
        <footer style={styles.footer}>
            <nav style={styles.nav}>
                <ul style={styles.navList}>
                    {navLinks.map((link, index) => (
                        <li key={index} style={styles.navItem}>
                            <a href={link.href} style={styles.navLink}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div style={styles.socialLinks}>
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} aria-label={link.label} style={styles.socialIcon}>
                        {link.icon}
                    </a>
                ))}
            </div>
            <p style={styles.copyright}>
                &copy; {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
        </footer>
    );
};

Footer.propTypes = {
    navLinks: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
        })
    ).isRequired,
};

const styles = {
    footer: {
        padding: '20px',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
    },
    nav: {
        marginBottom: '20px',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    navItem: {
        margin: '0 10px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#000',
    },
    socialLinks: {
        marginBottom: '20px',
    },
    socialIcon: {
        margin: '0 10px',
        color: '#000',
        fontSize: '24px',
    },
    copyright: {
        fontSize: '14px',
        color: '#777',
    },
};

export default Footer;
