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
	
	@AllArgsConstructor
	static class User {
		@JsonProperty
	    private final String login;
		@JsonProperty
	    private final String firstName;
		@JsonProperty
	    private final String lastName;
		@JsonProperty
	    private final String middleName;
		@JsonProperty
	    private final String phone;
		@JsonProperty
	    private final String email;
		@JsonProperty
	    private final String photo;
	}

}
