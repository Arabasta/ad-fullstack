package com.robotrader.spring.interfaces;

import com.robotrader.spring.model.User;

public interface IUserService {
    User findByUsername(String username);

    void save(User user);
}
