package com.github.melandr.testproject.server.services;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
class TestService {

	@GetMapping(value = "/test/hello", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	String helloWorld() {
		return "Hello world!";
	}

}
