package com.github.melandr.testproject.server.integration.db.role;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import com.github.melandr.testproject.server.protocol.role.RoleI;
import com.github.melandr.testproject.server.protocol.role.RoleProviderI;

@Component
class RoleProvider implements RoleProviderI {

    @Autowired
    private JdbcTemplate template;

    @Override
    public List<RoleI> getRoles() {
        return template.query("select ID, NAME from ROLES", new RowMapper<RoleI>() {
            @Override
            public RoleI mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Role(rs.getInt("ID"), rs.getString("NAME"));
            }
        });
    }

    @Override
    public int createRole(String name) {
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(con -> {
            PreparedStatement ps = con.prepareStatement("insert into ROLES(NAME) values (?)",
                    PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);
            return ps;
        }, keyHolder);
        return keyHolder.getKeyAs(Integer.class);
    }

    @Override
    public void deleteRole(int roleId) {
        template.update(con -> {
            PreparedStatement ps = con.prepareStatement("delete from ROLES where ID = ?");
            ps.setInt(1, roleId);
            return ps;
        });
    }

    @Override
    public List<RoleI> getRoles(int userId) {
        return template.query(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "select U.ID, U.NAME from USER_TO_ROLE as UR join ROLES as U on U.ID = UR.ROLE_ID where UR.USER_ID = ?");
            ps.setInt(1, userId);
            return ps;
        }, new RowMapper<RoleI>() {
            @Override
            public RoleI mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Role(rs.getInt("ID"), rs.getString("NAME"));
            }
        });
    }
}
