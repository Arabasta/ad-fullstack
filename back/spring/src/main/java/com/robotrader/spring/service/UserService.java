package com.robotrader.spring.service;

import com.robotrader.spring.dto.auth.RegistrationRequest;
import com.robotrader.spring.dto.auth.RegistrationResponse;
import com.robotrader.spring.dto.auth.UserDetailsDTO;
import com.robotrader.spring.interfaces.IUserService;
import com.robotrader.spring.model.Customer;
import com.robotrader.spring.model.User;
import com.robotrader.spring.model.enums.RoleEnum;
import com.robotrader.spring.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService, UserDetailsService {

    private final UserRepository userRepository;
    private final CustomerService customerService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, CustomerService customerService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.customerService = customerService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("User not found");

        return user;
    }

    @Transactional
    public RegistrationResponse create(RegistrationRequest registrationRequest, boolean isCustomer) {
        User user = new User();
        UserDetailsDTO userDetailsDTO = registrationRequest.getUserDetails();
        user.setUsername(userDetailsDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDetailsDTO.getPassword()));
        user.setEmail(userDetailsDTO.getEmail());

        if (isCustomer) {
            user.setRole(RoleEnum.ROLE_CUSTOMER);
            Customer customer = customerService.create(registrationRequest.getCustomerDetails());
            user.setCustomer(customer);
        } else {
            user.setRole(RoleEnum.ROLE_ADMIN);
        }

        save(user);
        return new RegistrationResponse("User registered successfully", user.getId());
    }
}
