package com.robotrader.spring.service;

import com.robotrader.spring.dto.auth.AuthenticationRequest;
import com.robotrader.spring.dto.auth.AuthenticationResponse;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.dto.user.UserCredentialsDTO;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.RoleEnum;
import com.robotrader.spring.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser_Success() {
        RegistrationRequest registrationRequest = new RegistrationRequest();
        registrationRequest.setUserDetails(new UserCredentialsDTO("user", "password", "user@example.com"));

        User user = new User();
        user.setUsername("user");

        when(jwtUtil.generateToken(user)).thenReturn("jwt-token");
        when(userService.create(registrationRequest, true)).thenReturn(user);

        RegistrationResponse response = authenticationService.registerUser(registrationRequest, true);

        assertNotNull(response);
        assertEquals("jwt-token", response.getJwtToken());
        assertEquals("user", response.getUsername());
        assertEquals(RoleEnum.ROLE_CUSTOMER, response.getRole());

        verify(userService).create(registrationRequest, true);
        verify(jwtUtil).generateToken(user);
    }

    @Test
    void testAuthenticateUser_Success() {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("user", "password");

        User user = new User();
        user.setUsername("user");
        user.setRole(RoleEnum.ROLE_CUSTOMER);

        when(jwtUtil.generateToken(user)).thenReturn("jwt-token");
        when(userService.loadUserByUsername("user")).thenReturn(user);

        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("user", "password"))).thenReturn(mock(Authentication.class));

        AuthenticationResponse response = authenticationService.authenticateUser(authenticationRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getJwtToken());
        assertEquals("user", response.getUsername());
        assertEquals(RoleEnum.ROLE_CUSTOMER, response.getRole());

        verify(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken("user", "password"));
        verify(userService).loadUserByUsername("user");
        verify(jwtUtil).generateToken(user);
    }


    @Test
    void testAuthenticateUser_Failure() {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("user", "wrong-password");

        doThrow(new RuntimeException("Bad credentials")).when(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken("user", "wrong-password"));

        Exception exception = assertThrows(RuntimeException.class, () ->
                authenticationService.authenticateUser(authenticationRequest)
        );

        assertEquals("Bad credentials", exception.getMessage());

        verify(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken("user", "wrong-password"));
        verify(userService, never()).loadUserByUsername(anyString());
        verify(jwtUtil, never()).generateToken(any(UserDetails.class));
    }
}
