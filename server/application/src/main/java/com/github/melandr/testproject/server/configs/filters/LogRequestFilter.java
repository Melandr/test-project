package com.github.melandr.testproject.server.configs.filters;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

import javax.servlet.FilterChain;
import javax.servlet.ReadListener;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

public class LogRequestFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(LogRequestFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        HttpServletRequestWrapper wrapper = new RequestWrapper(request);
        LOGGER.info("REQUEST INFO ===== >>>>>\n" + makeRequestInfo(wrapper));

        ContentCachingResponseWrapper resp = new ContentCachingResponseWrapper(response);
        try {
            filterChain.doFilter(wrapper, resp);
        } finally {
            LOGGER.info("RESPONSE INFO ===== >>>>>\n" + makeResponseInfo(resp));
        }
    }

    private String makeRequestInfo(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append(makeUrlInfo(request.getRequestURL()));
        sb.append(makeCookiesInfo(request.getCookies()));
        sb.append(makeHeadersInfo(request));
        sb.append(makeBodyInfo(request));
        return sb.toString();
    }

    private String makeUrlInfo(StringBuffer requestURL) {
        return "\tRequestURL: " + requestURL + "\n";
    }

    private String makeCookiesInfo(Cookie[] cookies) {
        StringBuilder sb = new StringBuilder();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                Cookie c = cookies[i];
                sb.append("\t\tCookie[").append(c.getName()).append("=").append(c.getValue()).append("]\n");
            }
        }
        return "\tRequest cookies:\n" + sb.toString();
    }

    private String makeHeadersInfo(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        if (request.getHeaderNames() != null) {
            Iterator<String> it = request.getHeaderNames().asIterator();

            while (it.hasNext()) {
                String hName = it.next();
                sb.append("\t\tHeader[").append(hName).append("=").append(request.getHeader(hName)).append("]\n");
            }
        }
        return "\tRequest headers:\n" + sb.toString();
    }

    private String makeBodyInfo(HttpServletRequest request) throws IOException {
        ServletInputStream stream = request.getInputStream();
        String body = "";
        if (stream != null) {
            String charset = StringUtils.defaultIfBlank(request.getCharacterEncoding(), StandardCharsets.UTF_8.name());
            body = org.apache.commons.io.IOUtils.toString(stream, Charset.forName(charset));
        }
        return "\tRequest body: " + body.toString() + "\n";
    }

    private String makeResponseInfo(ContentCachingResponseWrapper response) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("\tStatus: ").append(response.getStatus()).append("\n");
        sb.append("\tCharacterEncoding: ").append(response.getCharacterEncoding()).append("\n");
        sb.append("\tContentType: ").append(response.getContentType()).append("\n");
        sb.append("\tLocale: ").append(response.getLocale()).append("\n");
        sb.append(makeResponseHeadersInfo(response));

        String body = StringUtils.EMPTY;

        byte[] content = response.getContentAsByteArray();
        response.copyBodyToResponse();
        if (content != null) {
            body = new String(content, response.getCharacterEncoding());
        }

        sb.append("\tOutputStream: ").append(body).append("\n");

        return sb.toString();
    }

    private String makeResponseHeadersInfo(HttpServletResponse request) {
        StringBuilder sb = new StringBuilder();
        if (request.getHeaderNames() != null) {
            Iterator<String> it = request.getHeaderNames().iterator();

            while (it.hasNext()) {
                String hName = it.next();
                sb.append("\t\tHeader[").append(hName).append("=").append(request.getHeader(hName)).append("]\n");
            }
        }
        return "\tResponse headers:\n" + sb.toString();
    }

    private class RequestWrapper extends HttpServletRequestWrapper {
        private final byte[] originalBody;

        public RequestWrapper(HttpServletRequest request) throws IOException {
            super(request);
            if (request.getInputStream() == null) {
                originalBody = null;
            } else {
                originalBody = org.apache.commons.io.IOUtils.toByteArray(request.getInputStream());
            }
        }

        @Override
        public ServletInputStream getInputStream() throws IOException {
            if (originalBody == null) {
                return null;
            }
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(originalBody);
            return new ServletInputStream() {

                @Override
                public boolean isFinished() {
                    return false;
                }

                @Override
                public boolean isReady() {
                    return true;
                }

                @Override
                public void setReadListener(ReadListener listener) {
                }

                @Override
                public int read() throws IOException {
                    return byteArrayInputStream.read();
                }
            };
        }
    }


}
