package com.btl.userService.service;

import java.util.List;

import com.btl.userService.enums.RoleEnum;
import com.btl.userService.redis.UserSessionData;

public interface RedisService {
    void saveUserSession(String username, String accessToken, String refreshToken, List<RoleEnum> roles);
    UserSessionData getUserSession(String username);
    void deleteUserSession(String username);
    boolean sessionExists(String username);
}
