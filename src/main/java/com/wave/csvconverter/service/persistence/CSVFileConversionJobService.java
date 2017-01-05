/**
 * 
 */
package com.wave.csvconverter.service.persistence;

import java.nio.file.Path;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.wave.csvconverter.exception.CSVConversionException;

/*
 * The service is responsible for the files' conversion jobs
 */
@Service
public class CSVFileConversionJobService implements ConversionJobService {

	@Autowired
	@Qualifier("asyncJobLauncher")
	private JobLauncher jobLauncher;

	@Autowired
	private Job job;

	private static final Logger log = LoggerFactory.getLogger(CSVFileConversionJobService.class);

	/*
	 * Launch new file conversion Job which instance is uniquely identified by the uniquely
	 * generated stored file path. The Job is launched asynchronously as per defined Job launcher.
	 * The path is passed to the Job within the Job parameters
	 */
	@Override
	public void launchConversionJob(Path file) {
		log.info("Launching Job for the file '" + file.toString() + "'");
		try {
			JobParameters jobParameters = new JobParametersBuilder().addString("convert.file.name", file.toString())
					.toJobParameters();
			jobLauncher.run(job, jobParameters);
		} catch (Exception e) {
			log.error("Unable to launch data conversion job for " + file.toString() + ": " + e.getMessage());
			throw new CSVConversionException("Unable to launch data conversion job for " + file.toString(), e);
		}
	}
}
