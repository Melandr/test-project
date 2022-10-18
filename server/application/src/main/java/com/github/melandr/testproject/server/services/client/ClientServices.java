package com.github.melandr.testproject.server.services.client;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.commons.lang3.StringUtils;
import org.ehcache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.protocol.user.UserI;
import com.github.melandr.testproject.server.protocol.user.UserProviderI;
import com.github.melandr.testproject.server.services.client.Dto.AuthRequest;
import com.github.melandr.testproject.server.services.client.Dto.AuthResponse;
import com.github.melandr.testproject.server.services.error.ErrorResponse;

@RestController
class ClientServices {

    @Autowired
    private UserProviderI userProvider;

    @Autowired
    private Cache<String, String> tokensCache;

    @PostMapping(value = "/client/auth", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    ResponseEntity clientAuth(@RequestBody AuthRequest request) {
        String login = request.getLogin();

        if (StringUtils.isBlank(login) || StringUtils.isBlank(request.getPassword())) {
            return new ResponseEntity<ErrorResponse>(new ErrorResponse("Required field(s) is null or empty!"),
                    HttpStatus.BAD_REQUEST);
        }

        UserI user = userProvider.getUserByLogin(login);

        if (user == null) {
            return new ResponseEntity<AuthResponse>(new AuthResponse("Not found user with login: " + login + "!"),
                    HttpStatus.NOT_FOUND);
        }

        if (user != null && DigestUtils.md5DigestAsHex(user.getPassword()).equals(request.getPassword())) {
            if (!tokensCache.containsKey(login)) {
                String phrase = login + "#@#" + request.getPassword() + "_17QJcv@!~zc"
                        + DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now());
                tokensCache.put(login, DigestUtils.md5DigestAsHex(phrase.getBytes(StandardCharsets.UTF_8)));
            }

            return new ResponseEntity<AuthResponse>(new AuthResponse(tokensCache.get(request.getLogin())),
                    HttpStatus.OK);
        }

        return new ResponseEntity<AuthResponse>(new AuthResponse("Password is wrong!"), HttpStatus.NOT_FOUND);
    }

}
