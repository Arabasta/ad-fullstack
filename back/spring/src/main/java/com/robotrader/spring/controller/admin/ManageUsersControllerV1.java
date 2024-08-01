package com.robotrader.spring.controller.admin;

import com.robotrader.spring.dto.general.ApiResponse;
import com.robotrader.spring.dto.user.UsersDTO;
import com.robotrader.spring.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/manage-users")
public class ManageUsersControllerV1 {

    // todo : add actions for admin
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
}
