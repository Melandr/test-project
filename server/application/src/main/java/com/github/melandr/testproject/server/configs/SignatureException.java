package com.github.melandr.testproject.server.configs;

class SignatureException extends Exception {

    SignatureException(String message) {
        super("Wrong signature: " + message);
    }

}
