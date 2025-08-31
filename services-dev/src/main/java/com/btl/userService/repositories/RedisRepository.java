package com.btl.userService.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.btl.userService.redis.UserSessionData;

@Repository
public interface RedisRepository extends CrudRepository<UserSessionData, String> {
    
}
