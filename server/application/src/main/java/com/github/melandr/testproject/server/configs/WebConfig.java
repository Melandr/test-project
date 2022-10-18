package com.github.melandr.testproject.server.configs;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.github.melandr.testproject.server.configs.filters.LogRequestFilter;

@EnableWebMvc
@Configuration
class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

    @Bean
    public FilterRegistrationBean<LogRequestFilter> createLogRequestFilterBean() {
        LogRequestFilter mdcFilter = new LogRequestFilter();
        FilterRegistrationBean<LogRequestFilter> registrationBean = new FilterRegistrationBean<>(mdcFilter);
        registrationBean.addUrlPatterns("/client/*");
        registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return registrationBean;
    }

}