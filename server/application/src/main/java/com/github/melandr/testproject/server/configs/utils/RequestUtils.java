package com.github.melandr.testproject.server.configs.utils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

public class RequestUtils {

    private RequestUtils() {
    };

    public static String getBody(HttpServletRequest request) throws IOException {
        ServletInputStream stream = request.getInputStream();
        String body = "";
        if (stream != null) {
            String charset = StringUtils.defaultIfBlank(request.getCharacterEncoding(), StandardCharsets.UTF_8.name());
            body = org.apache.commons.io.IOUtils.toString(stream, Charset.forName(charset));
        }
        return body;
    }

    public static String getParamsRepresentation(HttpServletRequest request) {
        Iterator<String> parametrs = request.getParameterNames().asIterator();
        StringBuilder sb = new StringBuilder();
        boolean haveContent = false;
        while (parametrs.hasNext()) {
            if (!haveContent) {
                sb.append("?");
            }
            haveContent = true;
            String pName = parametrs.next();
            sb.append(pName).append("=").append(StringUtils.trimToEmpty(request.getParameter(pName))).append("&");
        }
        if (haveContent) {
            sb.deleteCharAt(sb.length() - 1);
        }
        return sb.toString();
    }

}
