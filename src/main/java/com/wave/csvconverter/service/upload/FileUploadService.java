package com.wave.csvconverter.service.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.wave.csvconverter.configuration.upload.UploadStorageProperties;
import com.wave.csvconverter.exception.upload.StorageException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
/*
 * The service manages file upload and storage operations
 * called by the web controller
 */
@Service
public class FileUploadService implements UploadService {

	private final Path rootLocation;

	@Autowired
	public FileUploadService(UploadStorageProperties properties) {
		this.rootLocation = Paths.get(properties.getLocation());
	}

	@Override
	public Path store(MultipartFile file) {
		try {
			if (file.isEmpty()) {
				throw new StorageException("Unable to store empty file " + file.getOriginalFilename());
			}
			// Create a unique location for the file to ensure concurrent files
			// processing by the web controllers
			String randomDirName = UUID.randomUUID().toString();
			Path randomDirLocation = this.rootLocation.resolve(randomDirName);
			Path randomFileLocation = randomDirLocation.resolve(file.getOriginalFilename());
			Files.createDirectory(randomDirLocation);
			Files.copy(file.getInputStream(), randomFileLocation);
			return randomFileLocation;
		} catch (IOException e) {
			throw new StorageException("Unable to store file " + file.getOriginalFilename(), e);
		}
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	@Override
	public void init() {
		try {
			Files.createDirectory(rootLocation);
		} catch (IOException e) {
			throw new StorageException("Could not initialize storage", e);
		}
	}
}
