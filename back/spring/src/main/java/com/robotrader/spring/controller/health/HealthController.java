package com.robotrader.spring.controller.health;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public String health() {
        return "OK";
    }

    @GetMapping("/customer")
    public String securityUserHealth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication: " + authentication);

        if (authentication != null && authentication.isAuthenticated()) {
            authentication.getAuthorities().forEach(authority -> {
                System.out.println("Authority: " + authority.getAuthority());
            });

            if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_CUSTOMER"))) {
                return "Customer security check passed";
            } else {
                return "Customer security check failed - Missing ROLE_CUSTOMER";
            }
        } else {
            return "Customer security check failed - Authentication is null or not authenticated";
        }
    }

    @GetMapping("/admin")
    public String securityAdminHealth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() &&
                authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return "Admin security check passed";
        } else {
            return "Admin security check failed";
        }
    }
}
