package com.btl.userService.service;

import java.util.Map;

import com.btl.userService.entities.User;

public interface UserService {
    User register(User user);
    Map<String, String> login(String username, String password);
    //void logout(String refreshToken);
    User findUserByEmail(String email);
}
