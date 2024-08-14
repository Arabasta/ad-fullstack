package com.robotrader.spring.controller.user;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.user.EmailDTO;
import com.robotrader.spring.dto.user.UpdatePasswordDTO;
import com.robotrader.spring.dto.user.UserDTO;
import com.robotrader.spring.service.interfaces.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserControllerV1 {

    private final IUserService userService;

    @Autowired
    public UserControllerV1(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<ApiResponse<UserDTO>> getUserDetails(Authentication authentication) {
        String username = authentication.getName();
        UserDTO userDTO = userService.getUserDTOByUsername(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "User details retrieved successfully", userDTO));
    }

    @GetMapping("/email")
    public ResponseEntity<EmailDTO> getEmail(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(userService.getEmail(username));
    }

    @PutMapping("/update-email")
    public ResponseEntity<EmailDTO> updateEmail(Authentication authentication, @Valid @RequestBody EmailDTO emailDTO) {
        String username = authentication.getName();
        return ResponseEntity.ok(userService.updateEmail(username, emailDTO));
    }

    @PutMapping("/update-password")
    public ResponseEntity<ApiResponse<String>> updatePassword(Authentication authentication, @Valid @RequestBody UpdatePasswordDTO updatePasswordDTO) {
        String currentUsername = authentication.getName();
        userService.updatePassword(currentUsername, updatePasswordDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Password updated successfully", null));
    }
}