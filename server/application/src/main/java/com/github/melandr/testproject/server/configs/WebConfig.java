package com.github.melandr.testproject.server.configs;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.melandr.testproject.server.configs.filters.LogRequestFilter;

@EnableWebMvc
@Configuration
class WebConfig implements WebMvcConfigurer {

    @Autowired
    private SignInterceptor signInterceptor;
    @Autowired
    private TokenLiveInterceptor tokenLiveInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").exposedHeaders("Access-Control-Allow-Origin");
    }

    @Bean
    public FilterRegistrationBean<LogRequestFilter> createLogRequestFilterBean() {
        LogRequestFilter mdcFilter = new LogRequestFilter();
        FilterRegistrationBean<LogRequestFilter> registrationBean = new FilterRegistrationBean<>(mdcFilter);
        registrationBean.addUrlPatterns("/client/*");
        registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return registrationBean;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(signInterceptor).addPathPatterns("/client/**").excludePathPatterns("/client/auth")
                .order(1);
        registry.addInterceptor(tokenLiveInterceptor).addPathPatterns("/client/**")
                .excludePathPatterns("/client/auth", "/client/logout")
                .order(2);
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        final Class<AbstractJackson2HttpMessageConverter> JACKSON_CONVERTER_CLASS = AbstractJackson2HttpMessageConverter.class;
        converters.stream().filter(JACKSON_CONVERTER_CLASS::isInstance).map(JACKSON_CONVERTER_CLASS::cast)
                .forEach(abstractJackson2HttpMessageConverter -> abstractJackson2HttpMessageConverter
                        .setDefaultCharset(StandardCharsets.UTF_8));

        converters.stream().filter(JACKSON_CONVERTER_CLASS::isInstance).map(JACKSON_CONVERTER_CLASS::cast)
                .map(AbstractJackson2HttpMessageConverter::getObjectMapper)
                .forEach(mapper -> mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                        .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
                        .configure(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS, false)
                        .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, true)
                        .setSerializationInclusion(JsonInclude.Include.NON_NULL));
    }

}