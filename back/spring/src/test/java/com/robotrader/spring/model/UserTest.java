package com.robotrader.spring.model;

import com.robotrader.spring.model.enums.RoleEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {
    @Test
    public void testSetAndGetId() {
        User user = new User();
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    public void testSetAndGetCustomer() {
        User user = new User();
        Customer customer = new Customer();
        user.setCustomer(customer);
        assertEquals(customer, user.getCustomer());
    }

    @ParameterizedTest
    @EnumSource(RoleEnum.class)
    public void testSetAndGetRole(RoleEnum role) {
        User user = new User();
        user.setRole(role);
        assertEquals(role, user.getRole());
    }

    @Test
    public void testSetAndGetUsername() {
        User user = new User();
        user.setUsername("testUser");
        assertEquals("testUser", user.getUsername());
    }

    @Test
    public void testSetAndGetPassword() {
        User user = new User();
        user.setPassword("securePassword");
        assertEquals("securePassword", user.getPassword());
    }

    @Test
    public void testSetAndGetEmail() {
        User user = new User();
        user.setEmail("test@example.com");
        assertEquals("test@example.com", user.getEmail());
    }

    @Test
    public void testSetAndGetCreateDateTime() {
        User user = new User();
        LocalDateTime now = LocalDateTime.now();
        user.setCreateDateTime(now);
        assertEquals(now, user.getCreateDateTime());
    }

    @Test
    public void testSetAndGetUpdateDateTime() {
        User user = new User();
        LocalDateTime now = LocalDateTime.now();
        user.setUpdateDateTime(now);
        assertEquals(now, user.getUpdateDateTime());
    }

    @Test
    public void testSetAndGetIsDeleted() {
        User user = new User();
        user.setDeleted(true);
        assertTrue(user.isDeleted());
    }

    @Test
    public void testPrePersistSetsCreateDateTime() {
        User user = new User();
        user.onCreate();
        assertNotNull(user.getCreateDateTime());
    }

    @Test
    public void testPreUpdateSetsUpdateDateTime() {
        User user = new User();
        user.onUpdate();
        assertNotNull(user.getUpdateDateTime());
    }

    @ParameterizedTest
    @EnumSource(RoleEnum.class)
    public void testGetAuthorities(RoleEnum role) {
        User user = new User();
        user.setRole(role);
        assertEquals(Collections.singleton(new SimpleGrantedAuthority(role.name())), user.getAuthorities());
    }

    @Test
    public void testIsAccountNonExpired() {
        User user = new User();
        user.setRole(RoleEnum.ROLE_CUSTOMER);
        assertTrue(user.isAccountNonExpired());

        user.setRole(RoleEnum.ROLE_EXPIRED);
        assertFalse(user.isAccountNonExpired());
    }

    @Test
    public void testIsAccountNonLocked() {
        User user = new User();
        user.setRole(RoleEnum.ROLE_CUSTOMER);
        assertTrue(user.isAccountNonLocked());

        user.setRole(RoleEnum.ROLE_LOCKED);
        assertFalse(user.isAccountNonLocked());
    }

    @Test
    public void testIsCredentialsNonExpired() {
        User user = new User();
        user.setRole(RoleEnum.ROLE_CUSTOMER);
        assertTrue(user.isCredentialsNonExpired());

        user.setRole(RoleEnum.ROLE_EXPIRED);
        assertFalse(user.isCredentialsNonExpired());
    }

    @Test
    public void testIsEnabled() {
        User user = new User();
        user.setRole(RoleEnum.ROLE_CUSTOMER);
        assertTrue(user.isEnabled());

        user.setRole(RoleEnum.ROLE_LOCKED);
        assertFalse(user.isEnabled());

        user.setRole(RoleEnum.ROLE_EXPIRED);
        assertFalse(user.isEnabled());
    }
}
