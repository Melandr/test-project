package com.github.melandr.testproject.server.integration.db.user;

import com.github.melandr.testproject.server.protocol.user.UserI;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
class User implements UserI {

    private final int id;
    private final String login;
    private final byte[] password;
    //составное из FIRST_NAME_LAST_NAME_MIDDLE_NAME
    private final String name;
    
    private final String firstName;
    private final String lastName;
    private final String middleName;
    private final String phone;
    private final String email;
    private final String photo;
}
