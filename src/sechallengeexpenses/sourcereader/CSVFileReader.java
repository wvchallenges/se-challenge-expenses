package sechallengeexpenses.sourcereader;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.PrimitiveIterator.OfInt;
import java.util.stream.IntStream;

import sechallengeexpenses.model.Employee;
import sechallengeexpenses.model.Expense;
import sechallengeexpenses.model.SaleTax;

public class CSVFileReader implements IFileReader {
	private File csvFile;

	public CSVFileReader(File csvFile)
	{
		this.csvFile = csvFile;
	}
	
	// Assume input as:
	// date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
	@Override
	public List<Expense> readFile()
	{
		List<Expense> ret = new ArrayList<Expense>();
		
		BufferedReader readBuffer = null;
		
		try {
			readBuffer = new BufferedReader(new FileReader(this.csvFile));
			String line = readBuffer.readLine(); // this is the header
			
			while ((line = readBuffer.readLine()) != null) {
				ArrayList<String> fields = new ArrayList<String>();
				Iterator<Integer> charIter = line.chars().iterator();
				
				int currentIndex = 0;
				int startField = 0;
				int endField = -1;
				boolean inQuote = false;
				while(charIter.hasNext())
				{
					int charInt = charIter.next();
					if( charInt == ',')
					{
						if(!inQuote)
						{
							endField = currentIndex;
							fields.add(line.substring(startField, endField).replace("\"", ""));
							startField = currentIndex + 1;
						}
					}
					if( charInt == '"')
					{
						inQuote = !inQuote;
					}
					currentIndex++;
				}
				
				endField = currentIndex;
				fields.add(line.substring(startField, endField));
				
				Employee employee = new Employee(
						fields.get(2).trim(), 
						fields.get(3).trim());
				SaleTax saleTax = new SaleTax(fields.get(6).trim(), Double.valueOf(fields.get(7).replace(",", "").trim())/Double.valueOf(fields.get(5).replace(",", "").trim()));
				Expense expense = new Expense((new SimpleDateFormat("MM/dd/yyyy")).parse(fields.get(0).trim()),fields.get(1).trim(),fields.get(4).trim(), Double.valueOf(fields.get(5).replace(",", "").trim()) ,employee, saleTax);
				ret.add(expense);
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} finally {
			try {
				if (readBuffer != null)
				{
					readBuffer.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return ret;
	}

}
