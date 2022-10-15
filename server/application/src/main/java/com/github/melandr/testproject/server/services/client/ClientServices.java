package com.github.melandr.testproject.server.services.client;

import java.nio.charset.StandardCharsets;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.services.client.Dto.*;

import com.github.melandr.testproject.server.services.error.ErrorResponse;


@RestController
class ClientServices {

	private static final String ACCEPTABLE_USER_NAME = "user_1";
	private static final String ACCEPTABLE_USER_PASSWORD = "melandr3";
	
	private static final String MD5_HASH_PASSWORD = DigestUtils.md5DigestAsHex(ACCEPTABLE_USER_PASSWORD.getBytes(StandardCharsets.UTF_8));
	
	@PostMapping(value = "/client/auth", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	ResponseEntity clientAuth(@RequestBody AuthRequest request) {	
		if(StringUtils.isBlank(request.getName()) || StringUtils.isBlank(request.getPassword())) {
			return new ResponseEntity<ErrorResponse>(new ErrorResponse("Field(s) content is null or empty!"), HttpStatus.BAD_REQUEST);
		}
		if(ACCEPTABLE_USER_NAME.equals(request.getName()) && MD5_HASH_PASSWORD.equals(request.getPassword())) {
			return new ResponseEntity<AuthResponse>(new AuthResponse("wery_well_sign"), HttpStatus.OK);
		}
		
		return new ResponseEntity<AuthResponse>(new AuthResponse("user or password is fail!"), HttpStatus.NOT_FOUND);
	}

}
