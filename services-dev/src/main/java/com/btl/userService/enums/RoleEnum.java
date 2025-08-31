package com.btl.userService.enums;

public enum RoleEnum {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN"),
    MODERATOR("ROLE_MODERATOR");

    private final String value;

    RoleEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static RoleEnum fromString(String role) {
        for (RoleEnum r : RoleEnum.values()) {
            if (r.getValue().equalsIgnoreCase(role)) {
                return r;
            }
        }
        throw new IllegalArgumentException("No role found for: " + role);
    }
}

