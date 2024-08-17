package com.robotrader.spring.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtUtilTest {

    @Mock
    private UserDetails userDetails;

    private JwtUtil jwtUtil;

    private String token;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtUtil = new JwtUtil();

        jwtUtil = spy(jwtUtil);

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        when(userDetails.getUsername()).thenReturn("testUser");

        token = jwtUtil.generateToken(userDetails);
    }

    @Test
    void testExtractUsername() {
        String username = jwtUtil.extractUsername(token);
        assertEquals("testUser", username);
    }

    @Test
    void testExtractExpiration() {
        Date expiration = jwtUtil.extractExpiration(token);
        assertTrue(expiration.after(new Date()));
    }

    @Test
    void testGenerateToken() {
        assertNotNull(token);
        assertTrue(token.startsWith("eyJ"));
    }

    @Test
    void testValidateToken() {
        assertTrue(jwtUtil.validateToken(token, userDetails));
    }

    @Test
    void testInvalidToken() {
        UserDetails otherUserDetails = mock(UserDetails.class);
        when(otherUserDetails.getUsername()).thenReturn("otherUser");

        assertFalse(jwtUtil.validateToken(token, otherUserDetails));
    }
}
