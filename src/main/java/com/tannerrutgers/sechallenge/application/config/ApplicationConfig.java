package com.tannerrutgers.sechallenge.application.config;

import com.tannerrutgers.sechallenge.application.util.csvparser.EmployeeExpenseCSVParser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Application config file
 */
@Configuration
public class ApplicationConfig {

    @Bean
    public EmployeeExpenseCSVParser employeeExpenseCSVParser() {
        return new EmployeeExpenseCSVParser();
    }
}
