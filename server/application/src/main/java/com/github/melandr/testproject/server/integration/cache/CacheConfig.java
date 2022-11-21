package com.github.melandr.testproject.server.integration.cache;

import java.time.Duration;

import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class CacheConfig {

    public static final String STRINGS_CACHE_NAME = "stringsCache";

    private CacheManager cacheManager;

    @Autowired
    CacheConfig() {
        cacheManager = CacheManagerBuilder.newCacheManagerBuilder().build();
        cacheManager.init();

        cacheManager.createCache(STRINGS_CACHE_NAME,
                CacheConfigurationBuilder
                        .newCacheConfigurationBuilder(String.class, String.class, ResourcePoolsBuilder.heap(10))
                        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofMinutes(5))).build());
    }

    @Bean(STRINGS_CACHE_NAME)
    Cache<String, String> getStringsCache() {
        return cacheManager.getCache(STRINGS_CACHE_NAME, String.class, String.class);
    }
}
