package com.github.melandr.testproject.server.integration.user;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.github.melandr.testproject.server.protocol.user.UserI;
import com.github.melandr.testproject.server.protocol.user.UserProviderI;

@Component
public class UserProvider implements UserProviderI {

    private final Map<String, UserI> users;

    @Autowired
    UserProvider() {
        Map<String, UserI> users = new HashMap<>(2);
        users.put("user_1", new User("user_1", "melandr3".getBytes(StandardCharsets.UTF_8), "Иванов Иван Иванович"));
        users.put("admin_7", new User("admin_7", "hardcore_pass".getBytes(StandardCharsets.UTF_8), "Абдурахман Ибн Хоттаб"));
        this.users = Collections.unmodifiableMap(users);
    }

//    @Override
//    public Collection<UserI> getUsers() {
//        return users.values();
//    }

    @Override
    public UserI getUserByLogin(String login) {
        return users.get(login);
    }

}
