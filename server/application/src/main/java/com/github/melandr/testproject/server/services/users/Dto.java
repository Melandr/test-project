package com.github.melandr.testproject.server.services.users;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;

class Dto {

	@AllArgsConstructor
    static class UsersResponse {
        @JsonProperty
        private final List<Integer> users;
    }
	
}
