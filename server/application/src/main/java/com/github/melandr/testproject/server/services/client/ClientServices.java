package com.github.melandr.testproject.server.services.client;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.apache.commons.lang3.StringUtils;
import org.ehcache.Cache;
import org.ehcache.Cache.Entry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.github.melandr.testproject.server.exceptions.TokenExpireException;
import com.github.melandr.testproject.server.protocol.user.UserI;
import com.github.melandr.testproject.server.protocol.user.UserProviderI;
import com.github.melandr.testproject.server.services.client.Dto.AuthRequest;
import com.github.melandr.testproject.server.services.client.Dto.TokenContainer;
import com.github.melandr.testproject.server.services.client.Dto.UserResponse;
import com.github.melandr.testproject.server.services.error.ErrorResponse;

@Validated
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
            return new ResponseEntity<ErrorResponse>(new ErrorResponse("Not found user with login: " + login + "!"),
                    HttpStatus.NOT_FOUND);
        }

        if (user != null && DigestUtils.md5DigestAsHex(user.getPassword()).equals(request.getPassword())) {
            String token = getTokenByLogin(login);
            if (token == null) {
                String phrase = login + "#@#" + request.getPassword() + "_17QJcv@!~zc"
                        + DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now());
                token = DigestUtils.md5DigestAsHex(phrase.getBytes(StandardCharsets.UTF_8));
                tokensCache.put(token, login);
            }

            return new ResponseEntity<TokenContainer>(new TokenContainer(token), HttpStatus.OK);
        }

        return new ResponseEntity<ErrorResponse>(new ErrorResponse("Password is wrong!"), HttpStatus.NOT_FOUND);
    }

    private String getTokenByLogin(String login) {
        Iterator<Entry<String, String>> it = tokensCache.iterator();
        while (it.hasNext()) {
            Entry<String, String> entry = it.next();
            if (login.equals(entry.getValue())) {
                return entry.getKey();
            }
        }
        return null;
    }


    @DeleteMapping(value = "/client/logout")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    void logout(@Valid @NotBlank @RequestHeader(name = "token") String token) {
        tokensCache.remove(token);
    }

    @GetMapping(value = "/client/detail", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    UserResponse getDetail(@Valid @NotBlank @RequestHeader(name = "token") String token) throws TokenExpireException {
        String login = tokensCache.get(token);
        if (login == null) {
            throw new TokenExpireException();
        }
        UserI user = userProvider.getUserByLogin(login);
        return new UserResponse(user.getLogin());
    }
}
