package com.wave.csvconverter.utils.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.wave.csvconverter.domain.EmployeeExpense;

/*
 * The listener accepts notifications about the completed Jobs
 * and enables services to poll for a Job status
 */
@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

	private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

	private final JdbcTemplate jdbcTemplate;

	private Set<String> comlpetedJobsSet = Collections.synchronizedSet(new HashSet<String>());

	@Autowired
	public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/*
	 * Job completion notification handler. Registers completed Jobs
	 */
	@Override
	public void afterJob(JobExecution jobExecution) {
		if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
			String jobId = jobExecution.getJobParameters().getString("convert.file.name");
			// The completed Job status is registered in a synchronized Set by
			// the unique Job Id,
			// which is the unique converted file name
			addCompleteJobToSet(jobId);
			// Rest of this function is here for debugging only
			log.info("!!! JOB [" + jobId + "] FINISHED! Time to verify the results");

			List<EmployeeExpense> results = jdbcTemplate.query(
					"SELECT expense_date,category,employee_name,employee_address,expense_description,pretax_amount,tax_name,tax_amount FROM employee_expenses",
					new RowMapper<EmployeeExpense>() {
						@Override
						public EmployeeExpense mapRow(ResultSet rs, int row) throws SQLException {
							return new EmployeeExpense(rs.getDate(1), rs.getString(2), rs.getString(3), rs.getString(4),
									rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8));
						}
					});

			for (EmployeeExpense expense : results) {
				log.info("Found <" + expense + "> in the database.");
			}
		}
	}

	private void addCompleteJobToSet(String jobId) {
		comlpetedJobsSet.add(jobId);
	}

	/*
	 * Jobs status accessor for the services
	 */
	public boolean isJobInCompletedSet(String jobId) {
		return comlpetedJobsSet.contains(jobId);
	}
}
