package com.github.melandr.testproject.server.integration.db.user;

import java.nio.charset.StandardCharsets;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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
			PreparedStatement ps = con.prepareStatement("select * from USERS where LOGIN like ?");
			ps.setString(1, login);
			return ps;
		}, rs -> {
			if (rs.next()) {
				return makeUser(rs);
			}
			return null;
		});
	}

	private UserI makeUser(ResultSet rs) throws SQLException {
		String firstName = rs.getString("FIRST_NAME");
		String lastName = rs.getString("LAST_NAME");
		String middleName = rs.getString("MIDDLE_NAME");
		
		return new User(rs.getInt("ID"), rs.getString("LOGIN"), rs.getString("PASSWORD").getBytes(StandardCharsets.UTF_8),
				StringUtils.join(new String[] { firstName, lastName, middleName }, " "),
				firstName, lastName, middleName,
				rs.getString("PHONE"), rs.getString("EMAIL"),
				//TODO вернуть тут фото PHOTO blob(10K)
				null
				);
	}

	@Override
	public List<Integer> getUsers() {
		return template.query("select ID from USERS", new RowMapper<Integer>() {

			@Override
			public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
				return rs.getInt("ID");
			}
		});
	}

	@Override
	public UserI getUserById(Integer userId) {
		return template.query(con -> {
			PreparedStatement ps = con.prepareStatement("select * from USERS where ID = ?");
			ps.setInt(1, userId);
			return ps;
		}, rs -> {
			if (rs.next()) {
				return makeUser(rs);
			}
			return null;
		});
	}
}
