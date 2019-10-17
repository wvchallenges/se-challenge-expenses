package com.waveapps.sechallenge.dataReader;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.multipart.MultipartFile;

import com.waveapps.sechallenge.Application;
import com.waveapps.sechallenge.model.Expense;

import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class CSVExpensesDataReaderTest {

	@Autowired
	public DataReaderFactory dataReaderFactory;
	
	public List<Expense> expenses;
	
	@Test
	@SuppressWarnings("unchecked")
	public void testUnmarshall() throws Exception{
		
		DataReader<Expense> expenseDataReader = (DataReader<Expense>) dataReaderFactory.getInstance(DataReaderTypes.CSV_EXPENSE);
		
		expenses = expenseDataReader.unmarshall(getTestData());
		
		TestCase.assertNotNull(expenses);
		TestCase.assertTrue(expenses.size() > 0);
		TestCase.assertTrue(expenseDataReader.getWarnings().size() == 0);
	}
	
	private MultipartFile getTestData() throws IOException, URISyntaxException {
		URL fileURL = this.getClass().getClassLoader().getResource("test_data.csv");
		File f = new File(fileURL.toURI());
		Path path = Paths.get(f.getAbsolutePath());
		byte[] content = Files.readAllBytes(path);
		MultipartFile sourceFile = new MockMultipartFile("test_file.csv", "test_file.csv", "", content);
		return sourceFile;
	}
	
}
