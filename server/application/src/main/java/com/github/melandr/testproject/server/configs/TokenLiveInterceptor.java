package com.github.melandr.testproject.server.configs;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ehcache.Cache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.AsyncHandlerInterceptor;

@Component
class TokenLiveInterceptor implements AsyncHandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(TokenLiveInterceptor.class);

    @Autowired
    private Cache<String, String> tokensCache;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String token = request.getHeader("token");
        if (token != null) {
            String login = tokensCache.get(token);
            if (login != null) {
                tokensCache.put(token, login);
                LOGGER.info("extended token life for " + token);
            }
        }
        return true;
    }

}
