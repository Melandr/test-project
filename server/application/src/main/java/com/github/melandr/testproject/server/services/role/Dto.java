package com.github.melandr.testproject.server.services.role;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

class Dto {

    @AllArgsConstructor
    static class RolesResponse {
        @JsonProperty
        private final List<Role> roles;
    }

    @AllArgsConstructor
    static class Role {
        @JsonProperty
        private final int id;

        @JsonProperty
        private final String name;
    }

    @AllArgsConstructor
    static class CreateRoleResponse {
        @JsonProperty
        private final int id;
    }

    @Getter
    static class CreateRoleRequest {
        @NotBlank
        @JsonProperty
        private String name;
    }
}
