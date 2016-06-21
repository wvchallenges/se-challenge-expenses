package com.tannerrutgers.sechallenge.application.config;

import com.tannerrutgers.sechallenge.application.expenses.EmployeeExpenseCSVParser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Application config file
 */
@Configuration
class ApplicationConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/login").setViewName("login");
    }

    @Bean
    public EmployeeExpenseCSVParser employeeExpenseCSVParser() {
        return new EmployeeExpenseCSVParser();
    }
}
