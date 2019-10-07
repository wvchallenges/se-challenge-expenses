package com.wave.csvconverter.service.persistence;

import java.nio.file.Path;

public interface ConversionJobService {
	void launchConversionJob(Path file);
}
