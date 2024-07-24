package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @Length(min=3, max=20, message = "Username must be 3-20 characters")
    @Column(nullable = false, unique = true)
    private String username;

    @Length(min=6, message = "Password must at least 6 characters")
    @Column(nullable = false)
    private String password;

//    @Email(message = "Please input a valid Email")
//    @NotBlank(message = "Email cannot be blank")
//    @Column(nullable = false)
//    private String email; // temp disable for spring security

    private LocalDateTime createDateTime;
    private LocalDateTime updateDateTime;

    @PrePersist
    protected void onCreate() {
        createDateTime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateDateTime = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return role != RoleEnum.ROLE_EXPIRED;
    }

    @Override
    public boolean isAccountNonLocked() {
        return role != RoleEnum.ROLE_LOCKED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return role != RoleEnum.ROLE_EXPIRED;
    }

    @Override
    public boolean isEnabled() {
        return role != RoleEnum.ROLE_LOCKED && role != RoleEnum.ROLE_EXPIRED;
    }
}
