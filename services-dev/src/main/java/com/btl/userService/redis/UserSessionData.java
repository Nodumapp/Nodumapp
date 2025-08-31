package com.btl.userService.redis;

import java.io.Serializable;
import java.util.List;

import com.btl.userService.enums.RoleEnum;

public class UserSessionData implements Serializable {

    private static final long serialVersionUID = 1L;

    private String accessToken;
    private String refreshToken;
    private List<RoleEnum> roles;
    
    public UserSessionData(String accessToken, String refreshToken, List<RoleEnum> roles) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public List<RoleEnum> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleEnum> roles) {
        this.roles = roles;
    }
}
