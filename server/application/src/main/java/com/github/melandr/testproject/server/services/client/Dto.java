package com.github.melandr.testproject.server.services.client;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

class Dto {

	@Getter
	static class AuthRequest{
		@JsonProperty
		String name;
		@JsonProperty
		String password;
	}
	
	@AllArgsConstructor
	static class AuthResponse{
		@JsonProperty
		private String sign;
	}
}
