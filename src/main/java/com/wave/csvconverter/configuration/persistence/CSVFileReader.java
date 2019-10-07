package com.wave.csvconverter.configuration.persistence;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;

import com.wave.csvconverter.domain.EmployeeExpense;

/*
 * Custom batch file reader. The read accepts the CSV file name
 * for reading from the JobParameters.
 * Each job/reader instance can read its own file to ensure parallel
 * processing of multiple conversion batches. 
 */
@Component
@StepScope
public class CSVFileReader extends FlatFileItemReader<EmployeeExpense> {

	private String fileName;

	private static final Logger log = LoggerFactory.getLogger(CSVFileReader.class);

	/*
	 * The CVS file name is passed to the c'tor
	 */
	@Autowired
	public CSVFileReader(@Value("#{jobParameters['convert.file.name']}") final String fileName) {
		setFileName(fileName);
		initiazliazeReader();
	}

	/*
	 * The reader is initialized with custom line mapper used to fetch records from
	 * the CVS file according to the required format
	 */
	private void initiazliazeReader() {
		log.info("Initialize CSV Reader for the file '" + fileName + "'");

		setResource(new FileSystemResource(fileName));
		setLinesToSkip(1); // first line is title definition
		setLineMapper(new DefaultLineMapper<EmployeeExpense>() {
			{
				setLineTokenizer(new DelimitedLineTokenizer() {
					{
						setNames(new String[] { "date", "category", "employee_name", "employee_address",
								"expense_description", "pretax_amount", "tax_name", "tax_amount" });
					}
				});
				setFieldSetMapper(new BeanWrapperFieldSetMapper<EmployeeExpense>() {
					{
						setTargetType(EmployeeExpense.class);
					}
				});
			}
		});
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
