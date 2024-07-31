package com.robotrader.spring.service.interfaces;

import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.user.EmailDTO;
import com.robotrader.spring.dto.user.ResetPasswordDTO;
import com.robotrader.spring.dto.user.UpdatePasswordDTO;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.dto.user.UserDTO;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.User;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends UserDetailsService {
    @Transactional
    UserDTO getUserDTOByUsername(String username);

    User findByUsername(String username);
    void save(User user);
    User create(RegistrationRequest registrationRequest, boolean isCustomer);
    User getUserByUsername(String username);
    EmailDTO getEmail(String username);
    EmailDTO updateEmail(String username, EmailDTO emailDTO);
    void updatePassword(String username, UpdatePasswordDTO updatePasswordDTO);
    void resetPassword(String username, ResetPasswordDTO resetPasswordDTO);
    void delete(String username);
    void restore(String username);
    void lockAccount(String username);
    User getUserByPortfolio(Portfolio portfolio);
}
