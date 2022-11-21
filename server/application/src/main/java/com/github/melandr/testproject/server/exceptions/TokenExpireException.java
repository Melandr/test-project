package com.github.melandr.testproject.server.exceptions;

public class TokenExpireException extends Exception {

    public TokenExpireException() {
        super("token has expired.");
    }

}
