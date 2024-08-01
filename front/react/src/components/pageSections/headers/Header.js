import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ logo, navLinks, user }) => {
    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                {logo && <img src={logo} alt="Logo" style={styles.logo} />}
            </div>
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
            <div style={styles.userProfile}>
                {user && (
                    <>
                        <span style={styles.userName}>{user.name}</span>
                        <img src={user.avatar} alt="User Avatar" style={styles.userAvatar} />
                    </>
                )}
            </div>
        </header>
    );
};

Header.propTypes = {
    logo: PropTypes.string,
    navLinks: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }),
};

Header.defaultProps = {
    logo: '',
    user: null,
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #ddd',
    },
    logoContainer: {
        flex: '0 1 auto',
    },
    logo: {
        height: '40px',
    },
    nav: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 10px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#000',
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        marginRight: '10px',
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
    },
};

export default Header;
