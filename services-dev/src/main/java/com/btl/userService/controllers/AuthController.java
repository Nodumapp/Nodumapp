package com.btl.userService.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.btl.userService.entities.User;
import com.btl.userService.enums.RoleEnum;
import com.btl.userService.redis.UserSessionData;
import com.btl.userService.service.RedisService;
import com.btl.userService.service.UserService;
import com.btl.userService.utils.TokenUtil;
import com.btl.userService.utils.Validator;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
    private UserService userService;
    @Autowired
    private TokenUtil tokenUtil;
    //@Autowired
    //private RedisService redisService;

    @PostMapping("/register")
    public ResponseEntity<User> register(
    		@RequestBody Map<String, Object> userMap) throws Exception{
        try {
            String password = Validator.getPassword(userMap.get("password"));
            String email = Validator.getEmail(userMap.get("email"), true);
            String firstName = Validator.getString(userMap.get("firstName"), 50, true);
            String lastName = Validator.getString(userMap.get("lastName"), 50, true);
            
            User user = new User();
            user.setPassword(password);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setRole(RoleEnum.USER);

            User registeredUser = userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
    		@RequestBody Map<String, Object> userMap) throws Exception{
        try {
            String email = Validator.getString(userMap.get("email"), 50, true);
            String password = Validator.getString(userMap.get("password"), 50, true);
            
            Map<String, String> tokens = userService.login(email, password);
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    /*@PostMapping("/logout")
    public ResponseEntity<Void> logout(
    		@RequestHeader("Authorization") String authorizationHeader) throws Exception{
        try {
        	String token = Validator.getToken(authorizationHeader);
        	
            userService.logout(token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }*/

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            @RequestHeader("Authorization") String refreshTokenHeader) {
        try {
            String refreshToken = Validator.getToken(refreshTokenHeader);
            String email = tokenUtil.extractEmail(refreshToken);

            // Validar que el refresh token sea válido y no esté expirado
            if (tokenUtil.validateToken(refreshToken, email)) {
                // Generar nuevo access token
                String newAccessToken = tokenUtil.generateToken(email);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("accessToken", newAccessToken);
                // Se suele devolver el mismo refresh token hasta que expire
                tokens.put("refreshToken", refreshToken);

                return ResponseEntity.ok(tokens);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error refreshing token.");
        }
    }

    @PostMapping("/verify-token")
    public ResponseEntity<Map<String, String>> verifyToken(
    		@RequestHeader("Authorization") String authorizationHeader) throws Exception{
       
    	String token = Validator.getToken(authorizationHeader);

        String username = tokenUtil.extractEmail(token);
        boolean isValid = username != null && tokenUtil.validateToken(token, username);
        return ResponseEntity.ok(Map.of("valid", String.valueOf(isValid)));
    }
    
}