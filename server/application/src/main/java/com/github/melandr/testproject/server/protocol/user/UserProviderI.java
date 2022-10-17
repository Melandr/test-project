package com.github.melandr.testproject.server.protocol.user;

public interface UserProviderI {

//    Collection<UserI> getUsers();

    UserI getUserByLogin(String login);
}
