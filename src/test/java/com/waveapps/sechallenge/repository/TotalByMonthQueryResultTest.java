package com.waveapps.sechallenge.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.waveapps.sechallenge.Application;
import com.waveapps.sechallenge.model.TotalByMonthQueryResult;

import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class TotalByMonthQueryResultTest {

	@Test
	public void testGetMonthString() {
		
		String[] months = new String[]{ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
		
		for(int i = 0; i < months.length; i++) {
			TotalByMonthQueryResult t = new TotalByMonthQueryResult();
			t.setMonth(i+1);			
			TestCase.assertEquals(months[i], t.getMonthString());
		}
		
		
	}
	
}
