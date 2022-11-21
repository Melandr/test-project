package com.github.melandr.testproject.server.configs;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.melandr.testproject.server.exceptions.TokenExpireException;

import lombok.AllArgsConstructor;

@ControllerAdvice
class ExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @org.springframework.web.bind.annotation.ExceptionHandler({ NoHandlerFoundException.class,
            TokenExpireException.class })
    ErrorDetail handleNoHandlerFoundException(Exception exception) {
        return new ErrorDetail("Not found", exception.getMessage());
    }

    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler({ MethodArgumentNotValidException.class,
            HttpMessageNotReadableException.class, HttpRequestMethodNotSupportedException.class,
            ServletRequestBindingException.class, SignatureException.class })
    ErrorDetail handleStandartBadRequestException(Exception exception) {
        return new ErrorDetail("Wrong request", exception.getMessage());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @org.springframework.web.bind.annotation.ExceptionHandler(Throwable.class)
    ErrorDetail handleThrowable(Throwable exception) {
        return new ErrorDetail("Unexpected problems!", exception.getMessage());
    }

    @AllArgsConstructor
    private static class ErrorDetail {
        @JsonProperty
        String message;

        @JsonProperty
        String detail;
    }
}
