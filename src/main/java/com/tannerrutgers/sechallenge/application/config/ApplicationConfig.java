package com.tannerrutgers.sechallenge.application.config;

import com.tannerrutgers.sechallenge.application.expenses.EmployeeExpenseCSVParser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Application config file
 */
@Configuration
class ApplicationConfig {

    @Bean
    public EmployeeExpenseCSVParser employeeExpenseCSVParser() {
        return new EmployeeExpenseCSVParser();
    }
}
