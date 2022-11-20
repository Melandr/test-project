package com.github.melandr.testproject.server.integration.db.role;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.github.melandr.testproject.server.protocol.role.RoleI;
import com.github.melandr.testproject.server.protocol.role.RoleProviderI;

@Component
class RoleProvider implements RoleProviderI {

    @Autowired
    private JdbcTemplate template;

    @Override
    public List<RoleI> getRoles() {
        return template.query("SELECT id, name FROM roles", new RowMapper<RoleI>() {
            @Override
            public RoleI mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Role(rs.getInt("id"), rs.getString("name"));
            }
        });
    }

    @Override
    public int createRole(String name) {
        return 0;
    }

    @Override
    public void deleteRole(int roleId) {

    }

}
