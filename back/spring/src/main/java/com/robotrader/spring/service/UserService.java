package com.robotrader.spring.service;

import com.robotrader.spring.aws.sns.SnsPasswordNotificationService;
import com.robotrader.spring.aws.sns.SnsPortfolioNotificationService;
import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.user.*;
import com.robotrader.spring.exception.auth.InvalidPasswordException;
import com.robotrader.spring.exception.notFound.UserNotFoundException;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.Portfolio;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.RoleEnum;
import com.robotrader.spring.repository.UserRepository;
import com.robotrader.spring.service.interfaces.ICustomerService;
import com.robotrader.spring.service.interfaces.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService, UserDetailsService {

    private final UserRepository userRepository;
    private final ICustomerService customerService;
    private final PasswordEncoder passwordEncoder;
    private final SnsPortfolioNotificationService snsPortfolioNotificationService;
    private final SnsPasswordNotificationService snsPasswordNotificationService;

    @Autowired
    public UserService(UserRepository userRepository, ICustomerService customerService, PasswordEncoder passwordEncoder,
                       Optional<SnsPortfolioNotificationService> snsPortfolioNotificationService,
                       Optional<SnsPasswordNotificationService> snsPasswordNotificationService) {
        this.userRepository = userRepository;
        this.customerService = customerService;
        this.passwordEncoder = passwordEncoder;
        this.snsPortfolioNotificationService = snsPortfolioNotificationService.orElse(null);
        this.snsPasswordNotificationService = snsPasswordNotificationService.orElse(null);
    }

    @Transactional
    @Override
    public UserDTO getUserDTOByUsername(String username) {
        User user = getUserByUsername(username);
        return new UserDTO(
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getRole(),
                user.getCreateDateTime(),
                user.getUpdateDateTime(),
                user.isDeleted()
        );
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UsersDTO> searchUsersByUsernameOrEmail(String search) {
        return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search)
                .stream()
                .map(user -> new UsersDTO(user.getUsername(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public List<UsersDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UsersDTO(user.getUsername(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = this.findByUsername(username);
        if (user == null)
            throw new UserNotFoundException("User not found");

        return user;
    }

    @Override
    @Transactional
    public User create(RegistrationRequest registrationRequest, boolean isCustomer) {
        User user = new User();
        UserCredentialsDTO userCredentialsDTO = registrationRequest.getUserDetails();
        user.setUsername(userCredentialsDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userCredentialsDTO.getPassword()));
        user.setEmail(userCredentialsDTO.getEmail());

        if (isCustomer) {
            user.setRole(RoleEnum.ROLE_CUSTOMER);
            Customer customer = customerService.create(registrationRequest.getCustomerDetails());
            user.setCustomer(customer);
        } else {
            user.setRole(RoleEnum.ROLE_ADMIN);
        }
        save(user);
        return user;
    }

    @Override
    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    @Override
    public EmailDTO getEmail(String username) {
        User user = getUserByUsername(username);
        return new EmailDTO(user.getEmail());
    }

    @Override
    @Transactional
    public EmailDTO updateEmail(String username, EmailDTO emailDTO) {
        User user = getUserByUsername(username);
        user.setEmail(emailDTO.getEmail());
        save(user);
        return emailDTO;
    }

    @Override
    @Transactional
    public void updatePassword(String username, UpdatePasswordDTO updatePasswordDTO) {
        User user = getUserByUsername(username);
        // Validate old password
        if (!passwordEncoder.matches(updatePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new InvalidPasswordException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
        save(user);
        if (snsPasswordNotificationService != null)
            snsPasswordNotificationService.sendPasswordChangeNotification(username);
    }

    @Override
    @Transactional
    public void resetPassword(String username, ResetPasswordDTO resetPasswordDTO) {
        // todo: send email to verify password reset
        User user = getUserByUsername(username);
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getPassword()));
        save(user);
    }

    @Override
    @Transactional
    public void delete(String username) {
        User user = getUserByUsername(username);
        user.setDeleted(true);
    }

    @Override
    @Transactional
    public void restore(String username) {
        User user = getUserByUsername(username);
        user.setDeleted(false);
    }

    @Override
    public User getUserByPortfolio(Portfolio portfolio) {
        User user = userRepository.findByPortfolioId(portfolio.getId());
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        return user;
    }
}
