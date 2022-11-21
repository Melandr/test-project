package com.github.melandr.testproject.server.integration.db.role;

import com.github.melandr.testproject.server.protocol.role.RoleI;

class Role implements RoleI {

    private final int id;
    private final String name;

    Role(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

}
