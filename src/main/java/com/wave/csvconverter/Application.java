package com.wave.csvconverter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

import com.wave.csvconverter.configuration.upload.UploadStorageProperties;
import com.wave.csvconverter.service.upload.UploadService;

@SpringBootApplication
@EnableConfigurationProperties(UploadStorageProperties.class)
@EnableAsync
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	/*
	 * The bean initialization cleans up all leftover artifacts
	 * from the previous runs
	 */
	@Bean
	CommandLineRunner init(UploadService uploadService) {
		return (args) -> {
            uploadService.deleteAll();
            uploadService.init();
		};
	}
}
