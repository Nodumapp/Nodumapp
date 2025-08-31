package com.btl.userService.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.btl.userService.enums.RoleEnum;
import com.btl.userService.redis.UserSessionData;
import com.btl.userService.service.RedisService;

@Service
public class RedisServiceImpl implements RedisService {

	@Autowired
	private RedisTemplate<String, UserSessionData> redisTemplate;

	private String getSessionKey(String username) {
		return "session:" + username;
	}

	@Override
	public void saveUserSession(String username, String accessToken, String refreshToken, List<RoleEnum> roles) {
		UserSessionData sessionData = new UserSessionData(accessToken, refreshToken, roles);
		redisTemplate.opsForValue().set(getSessionKey(username), sessionData);
	}

	@Override
	public UserSessionData getUserSession(String username) {
		return redisTemplate.opsForValue().get(getSessionKey(username));
	}

	@Override
	public void deleteUserSession(String username) {
		redisTemplate.delete(getSessionKey(username));
	}

	@Override
	public boolean sessionExists(String username) {
		return redisTemplate.hasKey(getSessionKey(username));
	}
}
