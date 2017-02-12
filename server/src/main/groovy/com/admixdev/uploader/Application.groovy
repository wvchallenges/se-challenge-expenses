package com.admixdev.uploader

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.scheduling.annotation.EnableScheduling

/**
 * Created by alexander on 2017-02-12.
 */
@Slf4j
@SpringBootApplication
@EnableScheduling
@CompileStatic
class Application {
    static void main(String[] args) {
        SpringApplication.run(Application, args)
    }
}
