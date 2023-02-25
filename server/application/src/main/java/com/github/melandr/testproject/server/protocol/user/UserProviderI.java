package com.github.melandr.testproject.server.protocol.user;

import java.util.List;

public interface UserProviderI {

//    Collection<UserI> getUsers();

    UserI getUserByLogin(String login);

	List<Integer> getUsers();
}
