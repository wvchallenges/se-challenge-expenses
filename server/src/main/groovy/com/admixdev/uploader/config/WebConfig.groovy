package com.admixdev.uploader.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping

/**
 * Created by alexander on 2017-02-12.
 */
@Configuration
class WebConfig extends WebMvcConfigurationSupport {

    @Bean
    RequestMappingHandlerMapping requestMappingHandlerMapping() {
        RequestMappingHandlerMapping handlerMapping = super.requestMappingHandlerMapping()
        handlerMapping.useTrailingSlashMatch = false
        return handlerMapping
    }
}
