package com.wave.csvconverter.service.upload;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface UploadService {

	void init();

	Path store(MultipartFile file);

	void deleteAll();

}
