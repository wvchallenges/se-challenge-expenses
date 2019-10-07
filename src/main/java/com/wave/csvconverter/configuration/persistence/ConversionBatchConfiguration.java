package com.wave.csvconverter.configuration.persistence;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.launch.support.SimpleJobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;

import com.wave.csvconverter.domain.EmployeeExpense;
import com.wave.csvconverter.utils.persistence.JobCompletionNotificationListener;

/*
 * The class defines batch work-flow for CSV files conversion into RDMS
 */
@Configuration
@EnableBatchProcessing
public class ConversionBatchConfiguration {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;

	@Autowired
	public DataSource dataSource;

	@Autowired
	public JobRepository jobRepository;

	@Autowired
	public CSVFileReader fileReader;

	/*
	 * Override the basic synchronous Job launcher to enable
	 * asynchronous processing of the Job which would prevent
	 * web requests timeouts and improve UX
	 */
	@Bean
	public JobLauncher asyncJobLauncher() {
		SimpleJobLauncher simpleJobLauncher = new SimpleJobLauncher();
		simpleJobLauncher.setJobRepository(jobRepository);
		simpleJobLauncher.setTaskExecutor(new SimpleAsyncTaskExecutor());
		return simpleJobLauncher;
	}

	/*
	 * Simple writer definition. The data is written into a default in memory
	 * relation database. The table is initialized each time the application starts
	 */
	@Bean
	public JdbcBatchItemWriter<EmployeeExpense> writer() {
		JdbcBatchItemWriter<EmployeeExpense> writer = new JdbcBatchItemWriter<EmployeeExpense>();
		writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<EmployeeExpense>());
		writer.setSql(
				"INSERT INTO employee_expenses (expense_date, category,employee_name,employee_address,expense_description,pretax_amount,tax_name,tax_amount) VALUES (:date, :category, :employee_name, :employee_address, :expense_description, :pretax_amount, :tax_name, :tax_amount)");
		writer.setDataSource(dataSource);
		return writer;
	}

	/*
	 * Register custom Job completion notification listener which would tell us when
	 * a conversion Job is done
	 */
	@Bean
	public Job job(JobCompletionNotificationListener listener) {
		return jobBuilderFactory.get("importEmployeeExpenseJob").incrementer(new RunIdIncrementer()).listener(listener)
				.flow(step1()).end().build();
	}

	/*
	 * Conversion step definition
	 */
	@Bean
	public Step step1() {
		return stepBuilderFactory.get("step1").<EmployeeExpense, EmployeeExpense>chunk(1).reader(fileReader)
				.writer(writer()).build();
	}
}
