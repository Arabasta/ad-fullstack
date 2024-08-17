package com.robotrader.spring.service;

import com.robotrader.spring.aws.ses.SesPasswordNotificationService;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.user.ResetPasswordDTO;
import com.robotrader.spring.dto.user.UpdatePasswordDTO;
import com.robotrader.spring.dto.user.UserCredentialsDTO;
import com.robotrader.spring.dto.user.UserDTO;
import com.robotrader.spring.exception.auth.InvalidPasswordException;
import com.robotrader.spring.exception.notFound.UserNotFoundException;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.RoleEnum;
import com.robotrader.spring.repository.UserRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ICustomerService customerService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SesPasswordNotificationService sesPasswordNotificationService;

    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        Optional<SesPasswordNotificationService> optionalSesService = Optional.of(sesPasswordNotificationService);
        userService = new UserService(userRepository, customerService, passwordEncoder, optionalSesService);
    }

    @Test
    void testGetUserDTOByUsername_Success() {
        User user = new User();
        user.setUsername("user");
        user.setPassword("password");
        user.setEmail("user@example.com");
        user.setRole(RoleEnum.ROLE_CUSTOMER);

        when(userRepository.findByUsername("user")).thenReturn(user);

        UserDTO userDTO = userService.getUserDTOByUsername("user");

        assertNotNull(userDTO);
        assertEquals("user", userDTO.getUsername());
        assertEquals("password", userDTO.getPassword());
        assertEquals("user@example.com", userDTO.getEmail());
        assertEquals(RoleEnum.ROLE_CUSTOMER, userDTO.getRole());
    }

    @Test
    void testCreateUser_Success() {
        RegistrationRequest registrationRequest = new RegistrationRequest();
        UserCredentialsDTO userCredentialsDTO = new UserCredentialsDTO("user",
                "password", "user@example.com");
        registrationRequest.setUserDetails(userCredentialsDTO);

        Customer customer = new Customer();
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(customerService.create(any())).thenReturn(customer);

        User user = userService.create(registrationRequest, true);

        assertNotNull(user);
        assertEquals("user", user.getUsername());
        assertEquals("encodedPassword", user.getPassword());
        assertEquals("user@example.com", user.getEmail());
        assertEquals(RoleEnum.ROLE_CUSTOMER, user.getRole());
        assertEquals(customer, user.getCustomer());

        verify(userRepository).save(user);
    }

    @Test
    void testCreateAdminUser_Success() {
        RegistrationRequest registrationRequest = new RegistrationRequest();
        UserCredentialsDTO userCredentialsDTO = new UserCredentialsDTO("admin",
                "password", "admin@example.com");
        registrationRequest.setUserDetails(userCredentialsDTO);

        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        User user = userService.create(registrationRequest, false);

        assertNotNull(user);
        assertEquals("admin", user.getUsername());
        assertEquals("encodedPassword", user.getPassword());
        assertEquals("admin@example.com", user.getEmail());
        assertEquals(RoleEnum.ROLE_ADMIN, user.getRole());
        assertNull(user.getCustomer());

        verify(userRepository).save(user);
    }

    @Test
    void testLoadUserByUsername_Success() {
        User user = new User();
        user.setUsername("user");

        when(userRepository.findByUsername("user")).thenReturn(user);

        UserDetails userDetails = userService.loadUserByUsername("user");

        assertNotNull(userDetails);
        assertEquals("user", userDetails.getUsername());
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByUsername("user")).thenReturn(null);

        assertThrows(UserNotFoundException.class, () -> {
            userService.loadUserByUsername("user");
        });
    }

    @Test
    void testUpdatePassword_Success() {
        User user = new User();
        user.setUsername("user");
        user.setPassword("oldPassword");

        UpdatePasswordDTO updatePasswordDTO = new UpdatePasswordDTO("oldPassword", "newPassword");

        when(userRepository.findByUsername("user")).thenReturn(user);
        when(passwordEncoder.matches("oldPassword", user.getPassword())).thenReturn(true);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");

        userService.updatePassword("user", updatePasswordDTO);

        assertEquals("encodedNewPassword", user.getPassword());

        verify(userRepository).save(user);
        verify(sesPasswordNotificationService).sendPasswordChangeNotification("user", user.getEmail());
    }

    @Test
    void testUpdatePassword_InvalidOldPassword() {
        User user = new User();
        user.setUsername("user");
        user.setPassword("oldPassword");

        UpdatePasswordDTO updatePasswordDTO = new UpdatePasswordDTO("wrongOldPassword", "newPassword");

        when(userRepository.findByUsername("user")).thenReturn(user);
        when(passwordEncoder.matches("wrongOldPassword", user.getPassword())).thenReturn(false);

        assertThrows(InvalidPasswordException.class, () -> {
            userService.updatePassword("user", updatePasswordDTO);
        });

        verify(userRepository, never()).save(any(User.class));
        verify(sesPasswordNotificationService, never()).sendPasswordChangeNotification(anyString(), anyString());
    }

    @Test
    void testResetPassword_Success() {
        User user = new User();
        user.setUsername("user");

        ResetPasswordDTO resetPasswordDTO = new ResetPasswordDTO("newPassword");

        when(userRepository.findByUsername("user")).thenReturn(user);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");

        userService.resetPassword("user", resetPasswordDTO);

        assertEquals("encodedNewPassword", user.getPassword());

        verify(userRepository).save(user);
        verify(sesPasswordNotificationService).sendPasswordChangeNotification("user", user.getEmail());
    }

    @Test
    void testLockUser_Success() {
        User user = new User();
        user.setUsername("user");

        when(userRepository.findByUsername("user")).thenReturn(user);

        userService.lockUser("user");

        assertEquals(RoleEnum.ROLE_LOCKED, user.getRole());

        verify(userRepository).save(user);
    }

    @Test
    void testUnlockUser_Success() {
        User user = new User();
        user.setUsername("user");
        user.setRole(RoleEnum.ROLE_LOCKED);
        user.setCustomer(new Customer());

        when(userRepository.findByUsername("user")).thenReturn(user);

        userService.unlockUser("user");

        assertEquals(RoleEnum.ROLE_CUSTOMER, user.getRole());

        verify(userRepository).save(user);
    }
}
