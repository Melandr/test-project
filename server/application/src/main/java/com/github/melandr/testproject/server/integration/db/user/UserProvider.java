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
                    "select LOGIN, PASSWORD, FIRST_NAME, LAST_NAME, MIDDLE_NAME from USERS where LOGIN like ?");
            ps.setString(1, login);
            return ps;
        }, rs -> {
            User user = null;
            if(rs.next()) {
                user = new User(rs.getString("LOGIN"), rs.getString("PASSWORD").getBytes(StandardCharsets.UTF_8),
                        StringUtils.join(new String[] { rs.getString("FIRST_NAME"), rs.getString("LAST_NAME"),
                                rs.getString("MIDDLE_NAME") }, " "));
            }
            return user;
        });
    }

}
