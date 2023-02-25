package com.github.melandr.testproject.server.protocol.user;

public interface UserI {

    int getId();

    String getName();

    String getLogin();

    byte[] getPassword();

    String getFirstName();
    String getLastName();
    String getMiddleName();
    String getPhone();
    String getEmail();
    String getPhoto();
}
