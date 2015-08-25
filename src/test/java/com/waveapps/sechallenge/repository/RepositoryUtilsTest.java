package com.waveapps.sechallenge.repository;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.waveapps.sechallenge.Application;
import com.waveapps.sechallenge.dataReader.CSVExpensesDataReaderTest;
import com.waveapps.sechallenge.dataReader.DataReaderFactory;
import com.waveapps.sechallenge.model.Expense;

import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class RepositoryUtilsTest {

	@Autowired
	public RepositoryUtils repositoryUtils;
	
	@Autowired
	public DataReaderFactory dataReaderFactory;
	
	@Test
	public void testSaveAllExpenses() throws Exception{
		CSVExpensesDataReaderTest csvTest = new CSVExpensesDataReaderTest();
		csvTest.dataReaderFactory = dataReaderFactory;
		
		csvTest.testUnmarshall();
		List<Expense> expenses = csvTest.expenses;
		
		repositoryUtils.saveAll(expenses);
		
		TestCase.assertNotNull(expenses);
		
		for(Expense ex : expenses) {
			TestCase.assertFalse(ex.getId() == 0);
			TestCase.assertFalse(ex.getTax().getId() == 0);
			TestCase.assertFalse(ex.getEmployee().getId() == 0);
			TestCase.assertFalse(ex.getCategory().getId() == 0);
		}
		
	}
		
}
