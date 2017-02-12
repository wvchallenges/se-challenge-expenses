package com.admixdev.uploader.config

import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.services.s3.AmazonS3Client
import com.amazonaws.services.s3.transfer.TransferManager
import com.fasterxml.jackson.databind.ObjectMapper
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.embedded.MultipartConfigFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.datasource.DataSourceTransactionManager
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.annotation.EnableTransactionManagement
import org.springframework.transaction.annotation.TransactionManagementConfigurer
import org.springframework.transaction.support.TransactionTemplate


import javax.servlet.MultipartConfigElement
import javax.sql.DataSource

/**
 * Created by alexander on 2017-02-12.
 */
@Configuration
@EnableTransactionManagement
public class Beans implements TransactionManagementConfigurer {
    @Autowired Config config
    @Bean
    public ObjectMapper mapper() {
        new ObjectMapper()
    }

    @Bean
    public JsonSlurper jsonSlurper() {
        new JsonSlurper()
    }

    @Bean
    public JsonOutput jsonOutput() {
        new JsonOutput()
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        new MultipartConfigFactory(maxFileSize: 5000000000, maxRequestSize: 5000000000).createMultipartConfig()
    }

    @Bean
    public BasicAWSCredentials amazonCredentials() {
        new BasicAWSCredentials(config.awsAccessKey, config.awsSecretKey)
    }

    @Bean
    public AmazonS3Client s3Client() {
        new AmazonS3Client(amazonCredentials())
    }

    @Bean
    public TransferManager transferManager(AmazonS3Client s3Client) {
        new TransferManager(s3Client)
    }

    @Bean
    public DataSource pgDataSource() {
        new HikariDataSource(
                new HikariConfig(jdbcUrl: "jdbc:postgresql://${config.databaseHost}:${config.databasePort}/${config.databaseName}",
                        username: config.databaseUser, password: config.databasePass, maximumPoolSize: config.databasePoolSize,
                        minimumIdle: config.databasePoolMinIdle, connectionInitSql: "set search_path to '${config.databaseSchema}'"))
    }

    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager() {
        new DataSourceTransactionManager(pgDataSource());
    }

    @Bean
    public JdbcTemplate pgJdbcTemplate() {
        new JdbcTemplate(dataSourceTransactionManager().getDataSource());
    }

    @Bean
    public TransactionTemplate transactionTemplate() {
        new TransactionTemplate(dataSourceTransactionManager());
    }

    @Bean
    @Primary
    PlatformTransactionManager txManager() {
        new DataSourceTransactionManager(pgDataSource())
    }

    @Override
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        return txManager()
    }
}
