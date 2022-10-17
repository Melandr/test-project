package com.github.melandr.testproject.server.integration.user;

import com.github.melandr.testproject.server.protocol.user.UserI;

class User implements UserI {

    private final String login;
    private final byte[] password;
    private final String name;

    User(String login, byte[] password, String name) {
        this.login = login;
        this.password = password;
        this.name = name;
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
