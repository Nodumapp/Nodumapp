package com.btl.userService.utils;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Validator {

    public static String getString(Object value, int maxLength, boolean required) {
    	
        if (required && value == null) {
            throw new IllegalArgumentException("El valor es requerido y no puede ser nulo.");
        }

        String strValue;
        
        try {
            strValue = value.toString();
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("El valor proporcionado no se puede convertir a una cadena.", e);
        }

        if (strValue.length() > maxLength) {
            throw new IllegalArgumentException("El valor excede la longitud máxima de " + maxLength + " caracteres.");
        }

        return strValue;
    }
    
    public static String getPassword(Object value) {
        String password = getString(value, 50, true);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
    
    public static String getEmail(Object value, boolean required) {
    	String email = getString(value, 100, required);
        EmailValidator validator = EmailValidator.getInstance();

        if (!validator.isValid(email)) {
            throw new IllegalArgumentException("El correo electrónico proporcionado no es válido.");
        }

        return email;
    }

	public static String getToken(String refreshToken) {
		String token = null;
		if (refreshToken.startsWith("Bearer ")) {
			token = refreshToken.substring(7);
        }
		return token;
	}
}
