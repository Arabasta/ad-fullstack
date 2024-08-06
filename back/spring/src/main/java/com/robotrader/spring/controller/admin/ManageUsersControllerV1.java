package com.robotrader.spring.controller.admin;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.user.UsersDTO;
import com.robotrader.spring.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/manage-users")
public class ManageUsersControllerV1 {

    // todo : add more actions for admin
    // todo: add dto for lock / unlock if free
    // todo : add response dtos too if free
    private final IUserService userService;

    @Autowired
    public ManageUsersControllerV1(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UsersDTO>>> getUsers(@RequestParam(value = "search", required = false) String search) {
        List<UsersDTO> users;
        if (search != null && !search.isEmpty())
            users = userService.searchUsersByUsernameOrEmail(search);
        else
            users = userService.getAllUsers();

        return ResponseEntity.ok(new ApiResponse<>("success", "Users retrieved successfully", users));
    }

    @PostMapping("/lock")
    public ResponseEntity<ApiResponse<Void>> lockUser(@RequestParam String username) {
        userService.lockUser(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "User locked successfully", null));
    }

    @PostMapping("/unlock")
    public ResponseEntity<ApiResponse<Void>> unlockUser(@RequestParam String username) {
        userService.unlockUser(username);
        return ResponseEntity.ok(new ApiResponse<>("success", "User unlocked successfully", null));
    }

}
