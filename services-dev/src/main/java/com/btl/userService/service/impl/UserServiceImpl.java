package com.btl.userService.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.btl.userService.entities.User;
import com.btl.userService.repositories.UserRepository;
import com.btl.userService.service.RedisService;
import com.btl.userService.service.UserService;
import com.btl.userService.utils.TokenUtil;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TokenUtil tokenUtil;
	//@Autowired
	//private RedisService redisService;

	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public User register(User user) {
		return userRepository.save(user);
	}

	public Map<String, String> login(String email, String password) {
		User user = userRepository.findByEmail(email); 
		if (user != null && passwordEncoder.matches(password, user.getPassword())) {
			String accessToken = tokenUtil.generateToken(email);
			String refreshToken = tokenUtil.generateRefreshToken(email);
			Map<String, String> tokens = new HashMap<>();
			tokens.put("accessToken", accessToken);
			tokens.put("refreshToken", refreshToken);
			
			user.setLastLogin(LocalDateTime.now());
			userRepository.save(user);
			
			return tokens;
		} else {
			throw new RuntimeException("Invalid credentials");
		}
	}

	/*public void logout(String refreshToken) {
		String username = tokenUtil.extractEmail(refreshToken);

		if (username != null) {
			redisService.deleteUserSession(username);
		} else {
			throw new IllegalArgumentException("Invalid refresh token.");
		}
	}*/

	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

}