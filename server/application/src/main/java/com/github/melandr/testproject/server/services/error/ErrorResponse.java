package com.github.melandr.testproject.server.services.error;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ErrorResponse {
	@JsonProperty
	private String detail;
}
