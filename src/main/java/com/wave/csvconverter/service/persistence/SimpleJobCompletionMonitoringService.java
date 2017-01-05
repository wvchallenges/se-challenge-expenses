package com.wave.csvconverter.service.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wave.csvconverter.utils.persistence.JobCompletionNotificationListener;

/*
 * The service provide the Web controller information about the status of a particular Job
 */
@Service
public class SimpleJobCompletionMonitoringService implements BinaryJobCompletionMonitoringService {

	private final JobCompletionNotificationListener jobCompletionListener;

	@Autowired
	public SimpleJobCompletionMonitoringService(JobCompletionNotificationListener jobCompletionListener) {
		this.jobCompletionListener = jobCompletionListener;
	}

	public boolean isJobCompleted(String jobId) {
		return jobCompletionListener.isJobInCompletedSet(jobId);
	}
}
