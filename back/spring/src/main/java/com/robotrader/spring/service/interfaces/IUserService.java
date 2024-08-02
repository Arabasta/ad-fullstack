package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.user.*;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IUserService extends UserDetailsService {
    UserDTO getUserDTOByUsername(String username);
    User findByUsername(String username);
    List<UsersDTO> searchUsersByUsernameOrEmail(String search);
    List<UsersDTO> getAllUsers();
    void save(User user);
    User create(RegistrationRequest registrationRequest, boolean isCustomer);
    User getUserByUsername(String username);
    EmailDTO getEmail(String username);
    EmailDTO updateEmail(String username, EmailDTO emailDTO);
    void updatePassword(String username, UpdatePasswordDTO updatePasswordDTO);
    void resetPassword(String username, ResetPasswordDTO resetPasswordDTO);
    void delete(String username);
    void restore(String username);
    User getUserByPortfolio(Portfolio portfolio);
}
