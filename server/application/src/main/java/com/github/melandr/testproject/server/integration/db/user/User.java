package com.github.melandr.testproject.server.integration.db.user;

import com.github.melandr.testproject.server.protocol.user.UserI;

class User implements UserI {

    private final int id;
    private final String login;
    private final byte[] password;
    private final String name;

    User(int id, String login, byte[] password, String name) {
        this.id = id;
        this.login = login;
        this.password = password;
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

    @Override
    public String getLogin() {
        return login;
    }

    @Override
    public byte[] getPassword() {
        return password;
    }

}
