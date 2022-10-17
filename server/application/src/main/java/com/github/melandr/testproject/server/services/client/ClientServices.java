package com.github.melandr.testproject.server.services.client;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.services.client.Dto.AuthRequest;
import com.github.melandr.testproject.server.services.client.Dto.AuthResponse;
import com.github.melandr.testproject.server.services.error.ErrorResponse;


@RestController
class ClientServices {

	private static final String ACCEPTABLE_USER_NAME = "user_1";
	private static final String ACCEPTABLE_USER_PASSWORD = "melandr3";

	private static final String MD5_HASH_PASSWORD = DigestUtils.md5DigestAsHex(ACCEPTABLE_USER_PASSWORD.getBytes(StandardCharsets.UTF_8));

    private static final Map<String, String> TOKENS = Collections.synchronizedMap(new HashMap<>());

	@PostMapping(value = "/client/auth", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	ResponseEntity clientAuth(@RequestBody AuthRequest request) {
        String userName = request.getName();

        if (StringUtils.isBlank(userName) || StringUtils.isBlank(request.getPassword())) {
			return new ResponseEntity<ErrorResponse>(new ErrorResponse("Field(s) content is null or empty!"), HttpStatus.BAD_REQUEST);
		}

        if (ACCEPTABLE_USER_NAME.equals(userName) && MD5_HASH_PASSWORD.equals(request.getPassword())) {
            if (!TOKENS.containsKey(userName)) {
                String phrase = userName + "#@#" + request.getPassword() + "_17QJcv@!~zc"
                        + DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now());
                TOKENS.put(userName, DigestUtils.md5DigestAsHex(phrase.getBytes(StandardCharsets.UTF_8)));
            }

            return new ResponseEntity<AuthResponse>(
                    new AuthResponse(TOKENS.get(request.getName())), HttpStatus.OK);
		}

		return new ResponseEntity<AuthResponse>(new AuthResponse("user or password is fail!"), HttpStatus.NOT_FOUND);
	}

}
