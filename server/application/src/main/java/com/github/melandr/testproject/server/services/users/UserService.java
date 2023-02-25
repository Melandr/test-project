package com.github.melandr.testproject.server.services.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.protocol.user.UserI;
import com.github.melandr.testproject.server.protocol.user.UserProviderI;
import com.github.melandr.testproject.server.services.error.ErrorResponse;

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

	@GetMapping(value = "/user/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	ResponseEntity getUser(@PathVariable(name = "id" ,required = true) Integer id){
		UserI user = userProvider.getUserById(id);
		if(user==null) {
			return new ResponseEntity<ErrorResponse>(new ErrorResponse("Not found user with id: " + id + "!"),
                    HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Dto.User>(
				new Dto.User(user.getLogin(), user.getFirstName(), user.getLastName(), user.getMiddleName(), user.getPhone(), user.getEmail(), user.getPhoto()),
				HttpStatus.OK);
	}
}
