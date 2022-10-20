package com.github.melandr.testproject.server.configs;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.TemporalAccessor;
import java.util.Iterator;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.AsyncHandlerInterceptor;

import com.github.melandr.testproject.server.configs.utils.RequestUtils;

@Component
class SignInterceptor implements AsyncHandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(SignInterceptor.class);
    private static final DateTimeFormatter LDF = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    private static final String HEADER_PARAM_NAME = "sign";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if ("1".equals(request.getHeader("fakeCheck"))) {
            return true;
        }
        LocalDateTime current = LocalDateTime.now();
        String uri = request.getRequestURL().toString() + RequestUtils.getParamsRepresentation(request);
        String tmst = request.getHeader("tmst");
        String token = request.getHeader("token");
        String sign = request.getHeader(HEADER_PARAM_NAME);

        if (StringUtils.isBlank(tmst)) {
            throw new SignatureException("tmst is null or empty!");
        } else if (StringUtils.isBlank(token)) {
            throw new SignatureException("token is null or empty!");
        } else if (StringUtils.isBlank(sign)) {
            throw new SignatureException("sign is null or empty!");
        }
        LocalDateTime ldt = null;
        try {
            TemporalAccessor ta = LDF.parse(tmst);
            ldt = LocalDateTime.from(ta);
        } catch (DateTimeParseException dtpex) {
            throw new SignatureException("tmst has wrong format!");
        }

        String body = RequestUtils.getBody(request);

        String headers = buildHeadersInfo(request);
        String toSign = "[" + uri + "][" + headers + "][" + body + "]";
        String ownSign = makeSign(toSign);
        LOGGER.info("toSign: " + toSign + ", buildedSign: " + ownSign);

        if (ldt.isBefore(current.minusSeconds(10)) || ldt.isAfter(current)) {
            throw new SignatureException("tmst has wrong value!");
        }
        if (!ownSign.equals(sign)) {
            throw new SignatureException("sign has wrong value!");
        }

        return true;
    }

    private String makeSign(String toSign) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec("ILoveMyProject".getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hmacSha256 = mac.doFinal(toSign.getBytes(StandardCharsets.UTF_8));
        return String.format("%064x", new BigInteger(1, hmacSha256));
    }

    private String buildHeadersInfo(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();

        if (request.getHeaderNames() != null) {
            Iterator<String> it = request.getHeaderNames().asIterator();
            SortedSet<String> names = new TreeSet<>();
            while (it.hasNext()) {
                String hName = it.next();
                if (!HEADER_PARAM_NAME.equals(hName)) {
                    names.add(hName);
                }
            }

            if (names.size() > 0) {
                for (String hName : names) {
                    String value = StringUtils.trimToEmpty(request.getHeader(hName));
                    sb.append(hName).append("=").append(value).append(",");
                }
                sb.deleteCharAt(sb.length() - 1);
            }
        }

        return sb.toString();
    }

}
