package com.wave.csvconverter.service.persistence;

public interface BinaryJobCompletionMonitoringService {
	boolean isJobCompleted(String jobId);
}
