package com.waveapps.sechallenge.repository;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.waveapps.sechallenge.Application;
import com.waveapps.sechallenge.dataReader.DataReaderFactory;
import com.waveapps.sechallenge.model.TotalByMonthQueryResult;

import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class ExpenseRepositoryTest {
	
	@Autowired
	private ExpenseRepository expenseRepo;
	
	@Autowired
	public RepositoryUtils repositoryUtils;
	
	@Autowired
	public DataReaderFactory dataReaderFactory;
	
	private boolean isSetUp = false;
	
	@Before
	public void init() throws Exception {
		if(!isSetUp) {
			RepositoryUtilsTest utilsTest = new RepositoryUtilsTest();
			utilsTest.repositoryUtils = repositoryUtils;
			utilsTest.dataReaderFactory = dataReaderFactory;
			utilsTest.init();
			utilsTest.testSaveAllExpenses();
			isSetUp = true;
		}
	}
	
	@Test
	public void getTotalByMonth() throws Exception{
		
		List<TotalByMonthQueryResult> results = expenseRepo.getTotalByMonthObjects(expenseRepo.getTotalByMonth());
		
		TestCase.assertNotNull(results);
		TestCase.assertTrue(results.size() > 0);
		
		for(TotalByMonthQueryResult result : results) {
			TestCase.assertTrue(result.getMonth() <= 12 && result.getMonth() >= 1);
			TestCase.assertTrue(result.getYear() > 0);
			TestCase.assertTrue(result.getPreTaxAmountTotal() > 0);
			TestCase.assertTrue(result.getTaxAmountTotal() > 0);
			System.out.println(result);
		}
		
	}

}
