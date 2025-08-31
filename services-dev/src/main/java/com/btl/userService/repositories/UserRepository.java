package com.btl.userService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btl.userService.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
