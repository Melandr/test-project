package com.github.melandr.testproject.server.integration.db.user;

import java.nio.charset.StandardCharsets;
import java.sql.PreparedStatement;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.github.melandr.testproject.server.protocol.user.UserI;
import com.github.melandr.testproject.server.protocol.user.UserProviderI;

@Component
class UserProvider implements UserProviderI {

    @Autowired
    private JdbcTemplate template;

//        new User("user_1", "melandr3".getBytes(StandardCharsets.UTF_8), "Иванов Иван Иванович");
//        new User("admin_7", "hardcore_pass".getBytes(StandardCharsets.UTF_8), "Абдурахман Ибн Хоттаб");

    @Override
    public UserI getUserByLogin(String login) {
        return template.query(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "SELECT login, password, first_name, last_name, middle_name FROM users WHERE login LIKE ?");
            ps.setString(1, login);
            return ps;
        }, rs -> {
            User user = null;
            if(rs.next()) {
                user = new User(rs.getString("login"), rs.getString("password").getBytes(StandardCharsets.UTF_8),
                        StringUtils.join(new String[] { rs.getString("first_name"), rs.getString("last_name"),
                                rs.getString("middle_name") }, " "));
            }
            return user;
        });
    }

}
