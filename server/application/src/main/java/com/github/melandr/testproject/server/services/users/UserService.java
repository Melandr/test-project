package com.github.melandr.testproject.server.services.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.protocol.user.UserProviderI;

@Validated
@RestController
public class UserService {
	
	@Autowired
    private UserProviderI userProvider;

	@GetMapping(value = "/users/all", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    Dto.UsersResponse getUsers() {
		return new Dto.UsersResponse(userProvider.getUsers());
	}

}
