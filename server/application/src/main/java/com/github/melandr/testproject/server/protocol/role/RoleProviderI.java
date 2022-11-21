package com.github.melandr.testproject.server.protocol.role;

import java.util.List;

public interface RoleProviderI {

    List<RoleI> getRoles();

    int createRole(String name);

    void deleteRole(int roleId);

}
