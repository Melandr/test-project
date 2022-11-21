package com.github.melandr.testproject.server.services.client;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

class Dto {

    @ToString
	@Getter
	static class AuthRequest{
        @NotBlank
		@JsonProperty
        String login;
        @NotBlank
		@JsonProperty
		String password;
	}

	@AllArgsConstructor
	static class TokenContainer{
        @NotBlank
		@JsonProperty
        private String token;
	}

    @AllArgsConstructor
    static class UserResponse {
        @JsonProperty
        String name;
    }
}
