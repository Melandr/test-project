package com.github.melandr.testproject.server.integration.cache;

import java.time.Duration;

import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("cacheHelper")
public class CacheHelper {

    private static final String TOKENS_CACHE_NAME = "tokensCache";

    private CacheManager cacheManager;

    @Autowired
    CacheHelper() {
        cacheManager = CacheManagerBuilder.newCacheManagerBuilder().build();
        cacheManager.init();

        cacheManager.createCache(TOKENS_CACHE_NAME,
                CacheConfigurationBuilder
                        .newCacheConfigurationBuilder(String.class, String.class, ResourcePoolsBuilder.heap(10))
                        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofMinutes(5))).build());
    }

    public Cache<String, String> getTokensCache() {
        return cacheManager.getCache(TOKENS_CACHE_NAME, String.class, String.class);
    }
}
