package sechallengeexpenses.database.test;

import static org.junit.Assert.*;

import java.io.File;
import java.util.Iterator;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import sechallengeexpenses.model.Expense;
import sechallengeexpenses.sourcereader.CSVFileReader;

public class CSVReaderTest {

	private CSVFileReader reader = null;
	
	@Before
	public void setUp() throws Exception {
		reader = new CSVFileReader(new File("resource/data_example.csv"));
	}

	@Test
	public void testReadCSVFile() {
		List<Expense> expenses = reader.readFile();
		assert(expenses.size() == 19);
		
		Iterator<Expense> iter = expenses.iterator();
		
		while(iter.hasNext())
		{
			System.out.println(iter.next());
		}
	}

}
