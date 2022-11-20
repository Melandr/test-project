package com.github.melandr.testproject.server.services.categories;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.protocol.role.RoleI;
import com.github.melandr.testproject.server.protocol.role.RoleProviderI;

@RestController
class RoleServices {

    @Autowired
    private RoleProviderI roleProvider;

    @GetMapping(path = "/role/all", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Dto.RolesResponse getAllRoles() {
        List<RoleI> categories = roleProvider.getRoles();

        return new Dto.RolesResponse(categories.stream().map(e -> {
            return new Dto.Role(e.getId(), e.getName());
        }).collect(Collectors.toList()));
    }

    @PostMapping(path = "/role/create", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Dto.CreateRoleResponse createRole(@Valid @RequestBody Dto.CreateRoleRequest request) {
        int id = roleProvider.createRole(request.getName());
        return new Dto.CreateRoleResponse(id);
    }

    @DeleteMapping(path = "/role/{roleId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteRole(@PathVariable Integer roleId) {
        roleProvider.deleteRole(roleId);
    }
}
